import SnButton from '../../../src/components/snui/SnButton/SnButton'
import { render, fireEvent } from '@testing-library/vue'

describe('SnButton', () => {
  const BTN_TEXT = 'Hello World'

  function getOptions (props = {}, slots = {}) {
    return {
      props: {
        ...props
      },
      slots: {
        default: BTN_TEXT,
        ...slots
      }
    }
  }

  describe('Button Types', () => {
    it('Renders with default props', () => {
      const { queryByText } = render(SnButton, getOptions())
      // actually grabs the span. Get the button
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--primary')
    })

    it('Renders the secondary button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ type: 'secondary' }))
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--secondary')
    })

    it('Renders the warning button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ type: 'warning' }))
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--warning')
    })

    it('Renders the caution button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ type: 'caution' }))
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--caution')
    })

    it('Validates the type property correctly', () => {
      const spy = jest.spyOn(global.console, 'error')
      render(SnButton, getOptions({ type: 'badtype' }))
      expect(spy).toBeCalledWith(expect.stringMatching(/custom validator check failed for prop "type"/))
      spy.mockReset()
    })
  })

  describe('Display Behavior', () => {
    it('Renders the disabled button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ disabled: true }))
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--primary', 'sn-btn--disabled', 'sn-btn--primary--disabled')
    })

    it('Renders a circle button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ circle: true }))
      const btn = queryByText(BTN_TEXT).closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--primary', 'sn-btn--circle')
    })

    it('Renders an icon button correctly', () => {
      const { queryByText } = render(SnButton, getOptions({ icon: true }, { default: 'H' }))
      const btn = queryByText('H').closest('button')
      expect(btn).toBeTruthy()
      expect(btn).toHaveClass('sn-btn', 'sn-btn--primary', 'sn-btn--icon')
    })
  })

  describe('Interactivity', () => {
    it('Fires a click event', async () => {
      const { queryByText, emitted } = render(SnButton, getOptions())
      const btn = queryByText(BTN_TEXT).closest('button')
      await fireEvent.click(btn)
      expect(emitted().click).toBeTruthy()
    })

    it('Does not fire an event when disabled', async () => {
      const { queryByText, emitted } = render(SnButton, getOptions({ disabled: true }))
      const btn = queryByText(BTN_TEXT).closest('button')
      await fireEvent.click(btn)
      expect(emitted().click).toBeFalsy()
    })
  })

  describe('As a link', () => {
    it('renders as an anchor tag', () => {
      const { queryByText } = render(SnButton, getOptions({ href: 'https://www.simplenexus.com', target: '_blank' }))
      // Actually selects the span instead of the anchor
      const btn = queryByText(BTN_TEXT).closest('a')
      expect(btn).toBeTruthy()
      expect(btn).toHaveAttribute('href', 'https://www.simplenexus.com')
      expect(btn).toHaveAttribute('target', '_blank')
    })
  })
})
