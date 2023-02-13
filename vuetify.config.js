import HomeIcon from "~/assets/custom-icons/Home.vue";
import BotIcon from "~/assets/custom-icons/Bot.vue";
import DailyProfitIcon from "~/assets/custom-icons/DailyProfit.vue";
import ExchangeIcon from "~/assets/custom-icons/Exchange.vue";
import ReferralIcon from "~/assets/custom-icons/Referral.vue";
import SettingsIcon from "~/assets/custom-icons/Settings.vue";
import SubscriptionIcon from "~/assets/custom-icons/Subscription.vue";
import TutorialIcon from "~/assets/custom-icons/Tutorial.vue";
import WalletIcon from "~/assets/custom-icons/Wallet.vue";
import AdvancedBotIcon from "~/assets/custom-icons/AdvancedBot.vue";
import CoinIcon from "~/assets/custom-icons/Coin.vue";
import LogoutIcon from "~/assets/custom-icons/Logout.vue";

export default {

  icons: {
    values: {
      HomeIcon: {
        component: HomeIcon,
      },
      BotIcon: {
        component: BotIcon,
      },
      DailyProfitIcon: {
        component: DailyProfitIcon,
      },
      ExchangeIcon: {
        component: ExchangeIcon,
      },
      ReferralIcon: {
        component: ReferralIcon,
      },
      SettingsIcon: {
        component: SettingsIcon,
      },
      SubscriptionIcon: {
        component: SubscriptionIcon,
      },
      TutorialIcon: {
        component: TutorialIcon,
      },
      WalletIcon: {
        component: WalletIcon,
      },
      AdvancedBotIcon: {
        component: AdvancedBotIcon
      },
      CoinIcon: {
        component: CoinIcon
      },
      LogoutIcon: {
        component: LogoutIcon
      },

    },
  },
  theme: {
    options: { customProperties: true },
    dark: false,
    themes: {
      dark: {
        customGreen: "#C3F239",
        customGreen2: "#27d79e",
        customPink: "#FE759F",
        customYellow: "#FEE603",
        primary: '#3394F8',
        danger: '#ff002f',
        basic: '#2B2B2B',
        'basic-1': '#177e89',
        'basic-2': '#2B2B2B',
      },
      light: {
        customGreen: "#C3F239",
        customGreen2: "#27d79e",
        customPink: "#FE759F",
        customYellow: "#FEE603",
        primary: '#3394F8',
        primary2: '#46A0F8',
        danger: '#FF6469',
        success: '#1AD598',
        'success-light': "#d1f7ea",

        basic: '#ffffff',
        'basic-1': '#ffffff',
        'basic-2': '#ffffff',

        // BG
        'off-white': '#f4f7fd',

        // TEXT
        'primary-text': "#ffffff"
      }
    }
  },
}