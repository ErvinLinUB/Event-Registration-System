export abstract class StudentDef {
  protected studentid!: number;
  protected firstname!: string;
  protected lastname!: string;
  protected department!: string;

  abstract getStudentId(): number;
  abstract getFirstName(): string;
  abstract getLastName(): string;
  abstract getDepartment(): string;

  abstract setStudentId(id: number): void;
  abstract setFirstName(firstname: string): void;
  abstract setLastName(lastname: string): void;
  abstract setDepartment(department: string): void;

  abstract addStudent(): Promise<number>;
}