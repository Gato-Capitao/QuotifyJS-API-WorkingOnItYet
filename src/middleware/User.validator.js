export class UserValidator{
    async createUserValidation(req, res, next) {
        const { username, email, password } = req.body || {};
        const fields = ["username", "email", "password"];
        const errors = [];
      
        for (const field of fields) {
          if (!req.body[field]) {
            errors.push(`The user needs a ${field}`);
          }
        }
      
        if (errors.length) {
          return res.status(404).json({ errors });
        }
      
        next();
      }
}