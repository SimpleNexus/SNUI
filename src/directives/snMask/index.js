import { VueMaskDirective } from 'v-mask'

/**
 * Workaround for a bug in the mask not allowing 'any' mask
 * @param el
 * @param binding
 * @returns {*}
 */
export default function snMask (el, binding) {
  return binding.value === undefined ? undefined : VueMaskDirective.bind(el, binding)
}
