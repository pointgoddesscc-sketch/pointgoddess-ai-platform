# TextPlus Firebase + Twilio setup

## Current implementation in this branch
- Firebase client auth UI at `/sign-in` supports email/password create/sign-in and phone OTP.
- SMS send route: `POST /api/textplus/sms` with Firebase ID token bearer auth.
- Twilio inbound and delivery callbacks validate Twilio signatures.
- Firestore rules default-deny access from clients. Inbound SMS is held in a restricted provider inbox until verified number-to-user mapping is implemented.

## Required Firebase setup
1. Create/select a Firebase project.
2. Enable Email/Password and Phone providers in Authentication.
3. Add the deployed TextPlus domain to Authentication > Settings > Authorized domains.
4. Create a Firestore database.
5. Create a service account and store its private key only in Vercel encrypted environment variables.
6. Apply `firestore.rules` and test that unauthenticated and non-member access is denied.

## Required Vercel environment variables
Client (public Firebase config; not a credential for admin access):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Server-only:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (preserve newlines or use escaped \\n)
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID`
- `TWILIO_INBOUND_WEBHOOK_URL` = `https://YOUR-PRODUCTION-DOMAIN/api/textplus/twilio/inbound`
- `TWILIO_STATUS_CALLBACK_URL` = `https://YOUR-PRODUCTION-DOMAIN/api/textplus/twilio/status`

Do not commit any real keys to Git. Add them in Vercel > Project > Settings > Environment Variables for Preview and Production as appropriate, then redeploy.

## Twilio console
- Set the inbound SMS webhook on the provisioned number or Messaging Service to the inbound URL above using HTTP POST.
- Set status callback to the status URL above.
- Complete any required US A2P 10DLC brand/campaign registration before sending application-to-person traffic.
- Use verified test recipients while on a Twilio trial. SMS cost and availability depend on destination and number type.

## Limitations and security release gates
- SMS is not end-to-end encrypted. This route stores SMS bodies in the server database and must be described as carrier SMS, not private E2EE chat.
- This PR does not implement the private app-to-app chat protocol, group chat membership, attachments, key management, or an assistant. Do not claim those are live.
- Inbound SMS is not yet mapped to a user's inbox; mapping a Twilio number to an account needs a verified number-ownership flow before exposing messages.
- Before production, add per-number/recipient abuse controls, consent and opt-out handling, delivery tests, monitoring, account deletion, and independent security review.
