import { storiesOf } from '@storybook/vue'
import SnAvatar from './SnAvatar'
import { radios, text, boolean } from '@storybook/addon-knobs'

const avatarSizeLabel = 'Size'
const avatarSizeOptions = {
  XL: 'xl',
  Large: 'large',
  Medium: 'medium',
  Standard: 'standard',
  Small: 'small',
  Mini: 'mini',
  Micro: 'micro'
}

const avatarSizeDefault = 'standard'

storiesOf('WIP/SnAvatar', module)
  .add('Basic Avatar', () => ({
    components: { SnAvatar },
    props: {
      size: {
        default: radios(avatarSizeLabel, avatarSizeOptions, avatarSizeDefault)
      },
      useFullInitials: {
        default: boolean('Use Full Initials', true)
      }
    },
    template: `
        <sn-avatar name="Molly Mesa"
                   :size="size"
                   :use-full-initials="useFullInitials"
        />`
  }), {
    info: {
      summary: `The avatar component can take a \`name\` prop which will be split into intitials.

       The \`useFullInitials\` prop can be used to control whether to render a single or both initials.`
    }
  })
  .add('Avatar With Image', () => ({
    components: { SnAvatar },
    props: {
      size: {
        default: radios(avatarSizeLabel, avatarSizeOptions, avatarSizeDefault)
      },
      validImage: {
        default: radios('Use Valid Image URL', {
          Valid: 'https://i.pravatar.cc/300',
          Invalid: 'invalidurl.invalid'
        }, 'https://i.pravatar.cc/300')
      },
      name: {
        default: text('Fallback Name', '')
      }
    },
    template: `
      <sn-avatar :image="validImage"
                 :name="name"
                 :size="size"
      />`
  }), {
    info: {
      summary: `
      The avatar component can take an \`image\` source url prop to render an image inside the avatar.
      If the image loading fails, the component will fall back to rendering initials from the \`name\` prop.
      If image loading failed and the \`name\` prop was not given, the component will render a default avatar image.
      `
    }
  })
  .add('Icon Avatar', () => ({

    components: { SnAvatar },
    props: {
      size: {
        default: radios(avatarSizeLabel, avatarSizeOptions, avatarSizeDefault)
      }
    },
    template: `
      <sn-avatar icon="bell"
                 :size="size"
      />`
  }), {
    info: {
      summary: `
      The avatar component can an icon prop which will render an icon inside the component. The icon scales in size with the component.`
    }
  })
