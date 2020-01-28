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
const computedAvatarSize = {
  xl () {
    return this.size === 'xl'
  },
  large () {
    return this.size === 'large'
  },
  medium () {
    return this.size === 'medium'
  },
  standard () {
    return this.size === 'standard'
  },
  small () {
    return this.size === 'small'
  },
  mini () {
    return this.size === 'mini'
  },
  micro () {
    return this.size === 'micro'
  }
}

storiesOf('SnAvatar', module)
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
                   :xl="xl"
                   :large="large"
                   :medium="medium"
                   :small="small"
                   :mini="mini"
                   :micro="micro"
                   :use-full-initials="useFullInitials"
        />`,
    computed: {
      ...computedAvatarSize
    }
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
                 :xl="xl"
                 :large="large"
                 :medium="medium"
                 :small="small"
                 :mini="mini"
                 :micro="micro"
      />`,
    computed: {
      ...computedAvatarSize
    }
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
                 :xl="xl"
                 :large="large"
                 :medium="medium"
                 :small="small"
                 :mini="mini"
                 :micro="micro"
      />`,
    computed: {
      ...computedAvatarSize
    }
  }), {
    info: {
      summary: `
      The avatar component can an icon prop which will render an icon inside the component. The icon scales in size with the component.`
    }
  })
