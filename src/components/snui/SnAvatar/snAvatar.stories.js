import { storiesOf } from '@storybook/vue'
import SnAvatar from './SnAvatar'
import { radios, text } from '@storybook/addon-knobs'

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
      }
    },
    template: `
        <sn-avatar name="Molly Mormon Mesa"
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
      summary: `Summary`
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
      summary: `Summary`
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
      summary: `Summary`
    }
  })
