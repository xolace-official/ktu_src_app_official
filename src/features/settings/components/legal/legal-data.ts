import type { LucideIcon } from 'lucide-react-native';
import {
  FileText,
  Users,
  ShieldCheck,
  AlertCircle,
  Scale,
  RefreshCw,
  Mail,
  Lock,
  Database,
  Share2,
  Clock,
  UserCheck,
  Trash2,
  Globe,
} from 'lucide-react-native';

export interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string;
}

export const termsOfServiceSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileText,
    content: `By downloading, installing, or using the KTU SRC App, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.

These terms constitute a legally binding agreement between you and the KTU Students\u0027 Representative Council (SRC). We reserve the right to modify these terms at any time, and your continued use of the app constitutes acceptance of any changes.`,
  },
  {
    id: 'eligibility',
    title: 'User Eligibility',
    icon: Users,
    content: `The KTU SRC App is intended for use by:

\u2022 Currently enrolled students of Koforidua Technical University
\u2022 Faculty and staff members of KTU
\u2022 Alumni with valid credentials

You must provide accurate and complete information during registration. Users under 16 years of age must have parental or guardian consent to use this app.`,
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    icon: ShieldCheck,
    content: `When using the KTU SRC App, you agree to:

\u2022 Use the app only for lawful purposes
\u2022 Respect other users and their privacy
\u2022 Not share false or misleading information
\u2022 Not attempt to gain unauthorized access to any part of the app
\u2022 Not use the app to harass, bully, or intimidate others
\u2022 Not upload malicious content or viruses
\u2022 Comply with all university policies and regulations

Violation of these guidelines may result in account suspension or termination.`,
  },
  {
    id: 'user-content',
    title: 'User Content',
    icon: Users,
    content: `You retain ownership of content you submit through the app. However, by posting content, you grant KTU SRC a non-exclusive, royalty-free license to use, display, and distribute your content within the app.

You are solely responsible for the content you post. Content that violates university policies, is defamatory, or infringes on intellectual property rights may be removed without notice.`,
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Limitations',
    icon: AlertCircle,
    content: `The KTU SRC App is provided "as is" without warranties of any kind. We do not guarantee:

\u2022 Uninterrupted or error-free service
\u2022 Accuracy of all information provided
\u2022 Security from all potential threats

KTU SRC shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app. Our total liability shall not exceed the amount you paid for using the app (if any).`,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: Scale,
    content: `All intellectual property rights in the KTU SRC App, including but not limited to:

\u2022 App design and interface
\u2022 Logos and branding
\u2022 Software code and algorithms
\u2022 Original content and documentation

are owned by KTU SRC or its licensors. You may not copy, modify, distribute, or reverse engineer any part of the app without prior written consent.`,
  },
  {
    id: 'termination',
    title: 'Account Termination',
    icon: RefreshCw,
    content: `We may suspend or terminate your account if you:

\u2022 Violate these Terms of Service
\u2022 Engage in fraudulent or illegal activities
\u2022 Are no longer affiliated with KTU
\u2022 Request account deletion

Upon termination, your right to use the app ceases immediately. We may retain certain data as required by law or for legitimate business purposes.`,
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: Mail,
    content: `For questions about these Terms of Service, please contact us:

KTU Students\u0027 Representative Council
Koforidua Technical University
P.O. Box KF 981, Koforidua, Ghana

Email: info@ktusrc.org
Phone: +233 54 710 3309

We aim to respond to all inquiries within 48 business hours.`,
  },
];

export const privacyPolicySections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Privacy Overview',
    icon: Lock,
    content: `The KTU SRC App is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.

We encourage you to read this policy carefully. By using the app, you consent to the data practices described in this policy.`,
  },
  {
    id: 'data-collection',
    title: 'Information We Collect',
    icon: Database,
    content: `We collect information that you provide directly:

\u2022 Account Information: Name, student ID, email, phone number
\u2022 Profile Data: Department, level, profile picture
\u2022 Communications: feedback, and support requests
`,
  },
  {
    id: 'data-usage',
    title: 'How We Use Your Data',
    icon: UserCheck,
    content: `We use your information to:

\u2022 Provide and maintain the app services
\u2022 Personalize your experience
\u2022 Send important notifications and updates
\u2022 Respond to your inquiries and support requests
\u2022 Improve our services through analytics
\u2022 Ensure security and prevent fraud
\u2022 Comply with legal obligations

We will never sell your personal information to third parties.`,
  },
  {
    id: 'data-sharing',
    title: 'Information Sharing',
    icon: Share2,
    content: `We may share your information with:

\u2022 University Administration: For academic and administrative purposes
\u2022 Service Providers: Third parties who help us operate the app
\u2022 Legal Authorities: When required by law or to protect rights

All third parties are contractually obligated to protect your data and use it only for specified purposes.`,
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    icon: Clock,
    content: `We retain your personal information for as long as:

\u2022 Your account remains active
\u2022 Necessary to provide services
\u2022 Required by law or regulations
\u2022 Needed for legitimate business purposes

After graduation or account deletion, we may retain anonymized data for statistical purposes. Backup copies may persist for up to 90 days.`,
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: ShieldCheck,
    content: `We implement appropriate security measures including:

\u2022 Encryption of data in transit and at rest
\u2022 Secure authentication mechanisms
\u2022 Regular security assessments
\u2022 Access controls and monitoring
\u2022 Employee training on data protection

While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    icon: UserCheck,
    content: `You have the right to:

\u2022 Access: Request a copy of your personal data
\u2022 Correction: Update or correct inaccurate information
\u2022 Deletion: Request deletion of your data
\u2022 Portability: Receive your data in a portable format
\u2022 Objection: Object to certain processing activities
\u2022 Withdrawal: Withdraw consent at any time

To exercise these rights, contact us through the app or via email.`,
  },
  {
    id: 'data-deletion',
    title: 'Account & Data Deletion',
    icon: Trash2,
    content: `You can delete your account at any time through:

\u2022 App Settings > Delete Account
\u2022 Emailing info@ktusrc.org

Upon deletion request:
\u2022 Your account will be deleted immediately
\u2022 Some data may be retained for legal compliance
\u2022 To prevent mischievous activities, your email may be flagged as blacklisted under our policies
\u2022 You will not be able to create a new account with the same email
\u2022 Contact Support in that instance to appeal the decision`,
  },
  {
    id: 'international',
    title: 'International Data',
    icon: Globe,
    content: `Your information may be transferred to and processed in countries other than Ghana. These countries may have different data protection laws.

By using the app, you consent to the transfer of your information to Ghana and other countries where we operate. We ensure appropriate safeguards are in place for international transfers.`,
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    icon: Users,
    content: `The KTU SRC App is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    icon: RefreshCw,
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy in the app and updating the "Last Updated" date. We encourage you to review this policy periodically.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: `For privacy-related questions or concerns:

Tech & Innovation Officer
KTU Students\u0027 Representative Council
Koforidua Technical University

Email: info@ktusrc.org
Phone: +233 54 710 3309

We take all privacy concerns seriously and will respond within 48 hours.`,
  },
];

export const lastUpdatedDate = 'February 27, 2026';
