export const steps = ['complier', 'execute'] as const;

type CommandErrorType = (typeof steps)[number];

class CommandError {
  type: CommandErrorType;
  message: string;
  constructor(type: CommandErrorType, message: string, options?: ErrorOptions) {
    this.message = message;
    this.type = type;
    throw new Error(message, options);
  }
}

export default CommandError;
