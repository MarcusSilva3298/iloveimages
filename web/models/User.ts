export abstract class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly alias: string,
    // public Pictres?: Picture[];
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date,
    public readonly profilePicture?: string,
  ) {}
}
