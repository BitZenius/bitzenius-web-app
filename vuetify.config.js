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

import ChartArrowUpIcon from "~/assets/custom-icons/ChartArrowUp.vue";
import CopyCheckIcon from "~/assets/custom-icons/CopyCheck.vue";
import DocumentTextIcon from "~/assets/custom-icons/DocumentText.vue";
import ProfitBarChartIcon from "~/assets/custom-icons/ProfitBarChart.vue";

import MailIcon from "~/assets/custom-icons/Mail.vue";
import LockIcon from "~/assets/custom-icons/Lock.vue";
import UserIcon from "~/assets/custom-icons/User.vue";

import CopyIcon from "~/assets/custom-icons/Copy.vue";
import EarningsIcon from "~/assets/custom-icons/Earnings.vue";
import GiftIcon from "~/assets/custom-icons/Gift.vue";

import CameraSwitchIcon from "~/assets/custom-icons/CameraSwitch.vue";
import DepositIcon from "~/assets/custom-icons/Deposit.vue";
import WithdrawIcon from "~/assets/custom-icons/Withdraw.vue";

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
      ChartArrowUpIcon: {
        component: ChartArrowUpIcon,
      },
      CopyCheckIcon: {
        component: CopyCheckIcon,
      },
      DocumentTextIcon: {
        component: DocumentTextIcon,
      },
      ProfitBarChartIcon: {
        component: ProfitBarChartIcon
      },
      MailIcon: {
        component: MailIcon
      },
      LockIcon: {
        component: LockIcon
      },
      UserIcon: {
        component: UserIcon
      },
      CopyIcon: {
        component: CopyIcon
      },
      EarningsIcon: {
        component: EarningsIcon
      },
      GiftIcon: {
        component: GiftIcon
      },
      CameraSwitchIcon: {
        component: CameraSwitchIcon
      },
      DepositIcon: {
        component: DepositIcon
      },
      WithdrawIcon: {
        component: WithdrawIcon
      }
    },
  },

  theme: {
    options: { customProperties: true },
    dark: true,
    themes: {
      dark: {
        customGreen: "#C3F239",
        customGreen2: "#27d79e",
        customPink: "#FE759F",
        customYellow: "#FEE603",
        primary: '#3394F8',
        primary2: '#46A0F8',
        danger: '#FF6469',
        success: '#1AD598',
        'success-light': "#d1f7ea",

        basic: '#000000',
        'basic-1': '#000000',
        'basic-2': '#000000',
        'basic-text': '#ffffff',

        // BG
        'off-white': '#1D1F2B',
        'off-white-2': '#282B3D',
        'off-white-3': '#212434',

        // TEXT
        'primary-text': "#ffffff"
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
        'basic-text': '#000000',

        // BG
        'off-white': '#f4f7fd',
        'off-white-2': '#f4f7fd',
        'off-white-3': '#ffffff',

        // TEXT
        'primary-text': "#ffffff"
      }
    }
  },

}