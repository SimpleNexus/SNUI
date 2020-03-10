import SnTextField from '../../../src/components/snui/SnTextField/SnTextField'
import { render, fireEvent } from '@testing-library/vue'
import SnMask from '../../../src/directives/snMask'
import Vue from 'vue'

Vue.directive('sn-mask', SnMask)

describe('SnTextField', () => {
  const LABEL = 'label'
  const PLACEHOLDER = 'placeholder'

  function getOptions (props = {}) {
    return {
      props: {
        label: LABEL,
        placeholder: PLACEHOLDER,
        ...props
      }
    }
  }

  describe('Display Behavior', () => {
    it('Can be found by label', () => {
      const { queryByLabelText } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
    })

    it('renders the prepend icon with the correct classes', () => {
      const options = getOptions({ prependIcon: 'search' })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      expect(txtField).toHaveClass('sn-text-field-input--with-prepend-icon')
      expect(txtField.previousElementSibling).toHaveClass('prepend-icon', 'sn-icon-search')
    })

    it('renders the append icon with the correct classes', () => {
      const options = getOptions({ appendIcon: 'search' })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      expect(txtField).toHaveClass('sn-text-field-input--with-append-icon')
      expect(txtField.nextElementSibling).toHaveClass('append-icon', 'sn-icon-search')
    })

    it('respects full width', () => {
      const options = getOptions({ fullWidth: true })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      expect(txtField).toHaveStyle({ width: '100%' })
    })

    it('respects the type prop', () => {
      const options = getOptions({ type: 'number' })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField.type).toBe('number')
    })

    it('respects the required prop', () => {
      const options = getOptions({ required: true })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField.required).toBeTruthy()
    })

    it('renders an animation when the loading prop is true', () => {
      const options = getOptions({ loading: true })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField.nextElementSibling).toHaveClass('sn-text-field-animation')
    })
  })

  describe('Events', () => {
    it('Emits the input event with the right data', async () => {
      const { queryByLabelText, emitted } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      await fireEvent.update(txtField, 'test')
      expect(emitted().input).toBeTruthy()
      expect(emitted().input[0][0]).toBe('test')
    })

    it('Emits the focus event', async () => {
      const { queryByLabelText, emitted } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      await fireEvent.focus(txtField)
      expect(emitted().focus).toBeTruthy()
    })

    it('Emits the blur event', async () => {
      const { queryByLabelText, emitted } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      await fireEvent.blur(txtField)
      expect(emitted().blur).toBeTruthy()
    })

    it('Emits the keydown event', async () => {
      const { queryByLabelText, emitted } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      await fireEvent.keyDown(txtField, { key: 'a', code: 'Enter' })
      expect(emitted().keydown).toBeTruthy()
      expect(emitted().keydown[0][0].code).toBe('Enter')
    })
  })

  describe('Validation', () => {
    it('Emits the validation event on blur with no rules', async () => {
      const options = getOptions()
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'test')
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBeTruthy()
    })

    it('displays an error message if required and empty', async () => {
      const options = getOptions({ required: true })
      const { queryByText, queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField.required).toBeTruthy()
      await fireEvent.touch(txtField)
      expect(queryByText('Field is required')).toBeTruthy()
    })

    it('Emits validation error when field is required', async () => {
      const options = getOptions({ required: true })
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      expect(txtField.required).toBeTruthy()
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBe(false)
      expect(emitted().error[0][0][0]).toBe('Field is required')
    })

    it('will validate valid inputs with rules', async () => {
      const options = getOptions({ required: true, rules: [(input) => input.length > 5 || 'Invalid length'] })
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'Text longer than 5 characters')
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBeTruthy()
    })

    it('will validate invalid inputs with rules', async () => {
      const options = getOptions({ required: true, rules: [(input) => input.length > 5 || 'Invalid length'] })
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'Short')
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBeFalsy()
      expect(emitted().error[0][0][0]).toBe('Invalid length')
    })

    it('Handles a rule passing and a rule failing', async () => {
      const rules = [
        (value) => value.length > 5 || 'Invalid length',
        (value) => value[0] === 'S' || 'Wrong starting letter'
      ]
      const options = getOptions({ required: true, rules })
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'Short')
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBeFalsy()
      expect(emitted().error[0][0]).toHaveLength(1)
      expect(emitted().error[0][0][0]).toBe('Invalid length')
    })

    it('Provides default message if no string is passed', async () => {
      const rules = [
        (value) => value.length > 5
      ]
      const options = getOptions({ required: true, rules })
      const { queryByLabelText, emitted } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'Short')
      await fireEvent.touch(txtField)
      expect(emitted().validated[0][0]).toBeFalsy()
      expect(emitted().error[0][0]).toHaveLength(1)
      expect(emitted().error[0][0][0]).toBe('Invalid value')
    })

    it('catches invalid rules', async () => {
      const mock = jest.fn()
      console.error = mock
      const rules = [
        () => ({ test: 'object' })
      ]
      const options = getOptions({ required: true, rules })
      const { queryByLabelText } = render(SnTextField, options)
      const txtField = queryByLabelText(LABEL)
      await fireEvent.update(txtField, 'Short')
      await fireEvent.touch(txtField)
      expect(mock).toBeCalledWith(expect.stringMatching(/Rules should return a string or a boolean, received object instead/), expect.anything())
    })
  })
})
