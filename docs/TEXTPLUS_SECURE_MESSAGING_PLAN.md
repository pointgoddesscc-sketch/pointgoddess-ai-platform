# TextPlus secure messaging implementation plan

## Product scope
TextPlus is a standalone messaging product with a distinct dark interface and green accent. It should support:
- Account creation/sign-in by email and by phone verification.
- One-to-one conversations, group chats, contacts, read/delivery states, attachments, search, notifications, blocking/reporting, and account privacy controls.
- SMS through an assigned SMS-capable number, separate from app-to-app chat.
- An in-app assistant that answers questions only after the user explicitly opens it and that cannot read private conversations unless the user deliberately shares them.

## Important architecture distinction
SMS is not end-to-end encrypted by TextPlus: standard SMS passes through telecom networks and may be visible to carriers. Use SMS only for phone verification and external SMS delivery, and clearly disclose that limitation. For private TextPlus-to-TextPlus conversations, use an audited end-to-end encryption protocol/library (prefer the Signal Protocol implementation appropriate to the supported platforms), not custom cryptography. Server storage should contain ciphertext and routing metadata only. The server must not hold users' private decryption keys.

## Required services and secrets
No project environment variables were present during the initial configuration check. Add credentials only through Vercel Project Settings > Environment Variables; never commit secrets to Git.
- Authentication: Firebase Authentication or another selected identity provider.
- Database/realtime: Firestore or another selected persistent store, with strict per-user rules.
- SMS: Twilio Account SID, Auth Token/API key, and a provisioned SMS-capable number; configure inbound message webhook and delivery-status callback.
- Assistant: server-side model API key, with per-user rate limits and privacy disclosure.
- Push: APNs and/or FCM credentials if push notifications are enabled.

## Security acceptance criteria
- Use a vetted E2EE protocol with identity keys, signed prekeys, one-time prekeys, session ratcheting, device verification, key rotation, and encrypted attachment keys.
- Encrypt message bodies and attachments on the sender's device before upload. Do not log message plaintext, OTPs, credentials, or encryption keys.
- Enforce authentication and authorization server-side on every conversation and attachment operation.
- Apply rate limits, abuse prevention, consent, opt-out handling, and provider-compliant A2P registration where required for SMS.
- Verify inbound Twilio webhook signatures; never trust caller-supplied user IDs or phone numbers.
- Keep SMS verification codes short-lived, single-use, rate-limited, and out of logs.
- Provide account deletion, device/session management, blocking/reporting, backups policy, and clear metadata/privacy disclosures.
- Test on iOS Safari and Android Chrome, plus real provider numbers before claiming launch readiness.

## Release gates
1. Select and connect the auth/database provider and SMS provider.
2. Implement backend routes and database schema, with tests and security rules.
3. Integrate an audited E2EE library for each supported client platform and test key exchange/recovery.
4. Test two separate real accounts on different devices; verify message delivery, unauthorized access denial, webhook signatures, rate limits, and app restart persistence.
5. Verify production deployment and custom domain, then remove all sample conversations from the production build.

## Current status
The current deployment is a frontend preview. The existing screen includes sample messages and does not yet establish real user sessions, persistent conversations, real SMS delivery, or audited end-to-end encryption. Do not market it as fully working or E2EE until the release gates above pass.
