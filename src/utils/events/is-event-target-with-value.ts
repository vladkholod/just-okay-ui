import { WithValue } from '../types';

export function isEventTargetWithValue(element: EventTarget | null): element is WithValue<EventTarget> {
    const maybeWithValue = element as unknown as Partial<WithValue<EventTarget>>;
    return maybeWithValue.value !== undefined;
}
