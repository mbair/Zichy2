// utils/rx-ops.ts
import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export function distinctArrayBy<T>(
  selector: (item: T) => string | number | null | undefined
): MonoTypeOperatorFunction<T[] | null | undefined> {

  const toKey = (arr: T[] | null | undefined) =>
    (arr ?? [])
      .map(it => {
        const v = selector(it)
        return v == null ? '␀' : typeof v === 'number' ? `#${v}` : `@${v}`
      })
      .sort()
      .join('|')

  return distinctUntilChanged((a, b) => toKey(a) === toKey(b))
}

// comfort version for id
export const distinctByIds = <T extends { id?: string | number }>() =>
  distinctArrayBy<T>(x => x.id)
