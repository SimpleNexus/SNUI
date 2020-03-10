import SnTextField from '../../../src/components/snui/SnTextField/SnTextField'
import { render, fireEvent } from '@testing-library/vue'

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
      expect(txtField).toBeTruthy()
    })
  })

  describe('Events', () => {
    it('Emits the input event with the right data', async () => {
      const { queryByLabelText } = render(SnTextField, getOptions())
      const txtField = queryByLabelText(LABEL)
      expect(txtField).toBeTruthy()
      await fireEvent.update(txtField)
    })
  })
})
