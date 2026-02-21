export abstract class EventDef {
  protected eventid!: number;
  protected eventname!: string;
  protected eventdate!: string;
  protected numofparticipantsregistered!: number;
  protected maxparticipants!: number;

  abstract getEventId(): number;
  abstract getEventName(): string;
  abstract getEventDate(): string;
  abstract getNumOfParticipantsRegistered(): number;
  abstract getMaxParticipants(): number;

  abstract setEventId(id: number): void;
  abstract setEventName(name: string): void;
  abstract setEventDate(date: string): void;
  abstract setNumOfParticipantsRegistered(n: number): void;
  abstract setMaxParticipants(n: number): void;

  abstract addEvent(): Promise<number>;
}
