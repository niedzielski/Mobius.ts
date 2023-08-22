export declare type Next<Model, Effect> = {
  model: Model | null;
  effects: Effect[];
};
export declare type Updater<Model, Event, Effect> = (
  model: Model,
  event: Event
) => Next<Model, Effect>;
export declare type Initiator<Model, Effect> = (
  model: Model
) => Next<Model, Effect>;
export declare type EffectHandler<Effect, Event> = (
  effect: Effect,
  dispatch: Dispatch<Event>
) => void;
export declare type EventSource<Event> = (dispatch: Dispatch<Event>) => void;
declare type Dispatch<Event> = (event: Event) => void;
declare type Listener<Event> = (event: Event) => void;
export declare class Loop<Model, Event, Effect> {
  currentModel: Model;
  private updater;
  private effectHandlers;
  private listeners;
  constructor(
    defaultModel: Model,
    updater: Updater<Model, Event, Effect>,
    effectHandlers: EffectHandler<Effect, Event>[],
    eventSources: EventSource<Event>[],
    initiator?: Initiator<Model, Effect>
  );
  static simpleLoop<Model, Event>(
    defaultModel: Model,
    updater: Updater<Model, Event, never>
  ): Loop<Model, Event, never>;
  on: (listener: Listener<Model>) => void;
  off: (listener: Listener<Model>) => void;
  dispatch: (event: Event) => void;
  handleNext: (next: Next<Model, Effect>) => void;
}
export declare function next<Model, Effect>(
  model: Model,
  effects?: Effect[]
): Next<Model, Effect>;
export declare function dispatchEffects<Model, Effect>(
  effects: Effect[]
): Next<Model, Effect>;
export declare function noChange<Model, Effect>(): Next<Model, Effect>;
declare type UpdaterMapping<Model, Event, Effect> = {
  [K in keyof Model]: Updater<Model[K], Event, Effect>
};
export declare function combineUpdaters<Model, Event, Effect>(
  mapping: UpdaterMapping<Model, Event, Effect>
): Updater<Model, Event, Effect>;
export {};
