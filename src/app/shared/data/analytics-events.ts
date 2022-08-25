// Note: ScreenTrackingService and UserTrackingService are provided in the module app
// You don't need to track pages. Just focus on events that happen inside each page

export const
  TRIGGER_ANIMATION_PLAYED = 'trigger_animation_played',
  // {'animation_id': 'some_id_01'}

  ACTION_LANDING_CLICK = 'action_landing_click',
  // {'component': 'header', 'button': 'courses'}

  ACTION_WALLET_CONNECT = 'action_wallet_connect',
  // {'chain': 'XRPL', 'tx': 'transaction id'}

  REWARD_TOKEN = 'reward_token',
  // {'token': 'WTF', 'amount': '3.34', 'wallet_address': 'address', 'reward_counter': 6}

  INVESTEMENT_PROFILE_UPDATE = 'investment_profile_update';
// {'user_id':'doc id', 'completion_percentage': '%58'}


