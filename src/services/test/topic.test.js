import { TopicModel } from "../../models/Topic.model.js"
import { TopicService } from "../Topic.service.js"
import { UserService } from "../User.service.js"
import { UserModel } from "../../models/User.model.js"

// Use mocks for database interactions
jest.mock("../../models/Topic.model.js")
jest.mock("../../models/User.model.js")

// Instantiate services within tests for better isolation

describe("TopicService", () => {
  afterEach(async () => {
    // Use mock functions for cleanup
    await TopicModel.destroy.mockClear()
    await UserModel.destroy.mockClear()
  })

  test("The user can create a topic", async () => {
    const service = new TopicService()

    // Mock createUser response
    const mockedUser = { userId: 1 }
    UserService.createUser.mockResolvedValueOnce(mockedUser)

    const response = await service.createTopic("Resilience", "Quotes about resilience", mockedUser.userId)

    expect(response.statusValue).toBe(201)
    expect(TopicModel.create).toHaveBeenCalledWith({
      title: "Resilience",
      description: "Quotes about resilience",
      userId: mockedUser.userId,
    })
  })

  test("The user can't create a duplicate topic", async () => {
    const service = new TopicService()

    // Mock createUser response
    const mockedUser = { userId: 1 }
    UserService.createUser.mockResolvedValueOnce(mockedUser)

    // Mock TopicModel.create to throw on duplicate
    TopicModel.create.mockImplementationOnce(() => {
      throw new Error("Duplicate topic title")
    })

    await expect(service.createTopic("Resilience", "Quotes about resilience", mockedUser.userId)).rejects.toThrow("Duplicate topic title")

    // Expect create to be called only once
    expect(TopicModel.create).toHaveBeenCalledTimes(1)
  })

  test("Only the creator can update the title", async () => {
    const service = new TopicService()

    // Mock user creation
    const userCreator = { userId: 1 }
    const randomUser = { userId: 2 }
    UserService.createUser.mockResolvedValueOnce(userCreator)
    UserService.createUser.mockResolvedValueOnce(randomUser)

    // Mock topic creation
    const responseTopic = { topicId: 1 }
    const createMock = jest.fn().mockResolvedValueOnce(responseTopic)
    TopicModel.create = createMock

    // Create topic with creator
    await service.createTopic("A title", "A description", userCreator.userId)

    // Attempt update by random user (should fail)
    await expect(service.updateTitle(randomUser.userId, responseTopic.topicId, "test_test", "A new title")).rejects.toThrow()

    // Attempt update by creator (should succeed)
    const updateResponse = await service.updateTitle(userCreator.userId, responseTopic.topicId, "test_test", "A really new title")
    expect(updateResponse.statusValue).toBe(200)

    // Expect update to be called twice (once for each user)
    expect(TopicModel.update).toHaveBeenCalledTimes(2)
  })

  // Add a test for handling errors during updateTitle

  test("Handles errors during updateTitle", async () => {
    const service = new TopicService()

    // Mock user and topic creation
    const userCreator = { userId: 1 }
    const responseTopic = { topicId: 1 }
    UserService.createUser.mockResolvedValueOnce(userCreator)
    const createMock = jest.fn().mockResolvedValueOnce(responseTopic)
    TopicModel.create = createMock
    await service.createTopic("A title", "A description", userCreator.userId)

    // Mock TopicModel.update to throw on error
    TopicModel.update.mockImplementationOnce(() => {
      throw new Error("Database error")
    })

    // Expect update to throw
    await expect(service.updateTitle(userCreator.userId, responseTopic.topicId, "test_test", "A new title")).rejects.toThrow("Database error")
  })
})
