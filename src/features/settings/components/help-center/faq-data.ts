export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        question: 'How do I create an account?',
        answer:
          'Download the KTU SRC App and sign up using your institutional email address. You will receive a verification link to activate your account. Make sure to use your @ktu.edu.gh email.',
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer:
          'Tap "Forgot Password" on the login screen and enter your registered email. A password reset link will be sent to your inbox. Check your spam folder if you don\'t see it within a few minutes.',
      },
      {
        question: 'Can I use the app on multiple devices?',
        answer:
          'Yes! You can sign in to your account from any device. Your data and preferences will sync automatically across all your devices.',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events & Activities',
    items: [
      {
        question: 'How do I register for campus events?',
        answer:
          'Navigate to the Events tab, find an event you\'re interested in, and tap "Register." You\'ll receive a confirmation and reminder notifications before the event.',
      },
      {
        question: 'Can I get notifications for upcoming events?',
        answer:
          'Yes! Enable push notifications in your settings. You can customize which event categories you want to be notified about — academic, social, sports, and more.',
      },
      {
        question: 'How do I submit an event for approval?',
        answer:
          'If you\'re part of a recognized student organization, you can submit events through the SRC office. Contact the Events Committee for the submission guidelines and deadlines.',
      },
    ],
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    items: [
      {
        question: 'How do I list an item for sale?',
        answer:
          'Go to the Marketplace tab, tap the "+" button, add photos, set a price, write a description, and publish. Only KTU students can list and purchase items.',
      },
      {
        question: 'Is the marketplace safe to use?',
        answer:
          'We verify all users through their institutional email. Always meet in public campus areas for exchanges. Report any suspicious activity using the in-app reporting feature.',
      },
      {
        question: 'How do payments work?',
        answer:
          'The marketplace facilitates connections between buyers and sellers. Payment arrangements are made directly between parties. We recommend using mobile money for secure transactions.',
      },
    ],
  },
  {
    id: 'hostels',
    title: 'Hostels & Accommodation',
    items: [
      {
        question: 'How do I find available hostels?',
        answer:
          'Visit the Hostels tab to browse all available accommodations near campus. You can filter by price range, distance, amenities, and room type to find your ideal hostel.',
      },
      {
        question: 'Can I review a hostel?',
        answer:
          'Yes! After staying at a hostel, you can leave a review to help other students. Honest reviews help the community make better choices.',
      },
      {
        question: 'How do I report an issue with a hostel listing?',
        answer:
          'Tap the report button on any hostel listing to flag inaccurate information, misleading photos, or other concerns. Our team reviews all reports within 48 hours.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & Privacy',
    items: [
      {
        question: 'How do I update my profile information?',
        answer:
          'Go to Settings > Profile & Account to view your information. Some fields like your student ID and program are synced from the university system and cannot be changed manually.',
      },
      {
        question: 'Is my personal data secure?',
        answer:
          'We take your privacy seriously. All data is encrypted in transit and at rest. We never share your personal information with third parties. Read our full Privacy Policy for more details.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can request account deletion by contacting the SRC office or emailing src@ktu.edu.gh. Please note that this action is irreversible and all your data will be permanently removed.',
      },
    ],
  },
];
