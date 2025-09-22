import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and cookie information for smlee.dev",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          This Privacy Policy explains how smlee.dev (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your information 
          when you visit our website at https://smlee.dev (the &quot;Site&quot;).
        </p>
        <p className="mb-4">
          By using the Site, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect several different types of information for various purposes to provide and improve our service to you.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Personal Data</h3>
        <p className="mb-4">
          While using our Site, we may ask you to provide us with certain personally identifiable information 
          that can be used to contact or identify you (&quot;Personal Data&quot;). This may include, but is not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Email address (if you contact us)</li>
          <li>First name and last name (if you contact us)</li>
          <li>Usage data</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
        <p className="mb-4">
          We may also collect information on how the Site is accessed and used (&quot;Usage Data&quot;). 
          This Usage Data may include information such as your computer&apos;s Internet Protocol address (IP address), 
          browser type, browser version, the pages of our Site that you visit, the time and date of your visit, 
          the time spent on those pages, unique device identifiers, and other diagnostic data.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Tracking & Cookies Data</h3>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our Site and hold certain information.
        </p>
        <p className="mb-4">
          Cookies are files with a small amount of data which may include an anonymous unique identifier. 
          Cookies are sent to your browser from a website and stored on your device. 
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        <p className="mb-4">
          We use the following types of cookies:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Necessary cookies:</strong> Essential for the website to function properly</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with the website</li>
          <li><strong>Marketing cookies:</strong> Used to track visitors across websites</li>
          <li><strong>Preferences cookies:</strong> Enable the website to remember choices you make</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use of Data</h2>
        <p className="mb-4">
          We use the collected data for various purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
        <p className="mb-4">
          We use Google Analytics to help us understand how our visitors use the Site. 
          Google Analytics uses cookies to collect information and report website usage statistics.
        </p>
        <p className="mb-4">
          For more information on the privacy practices of Google, please visit the 
          <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer"> Google Privacy & Terms web page</a>.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
        <p className="mb-4">
          We would like to make sure you are fully aware of all of your data protection rights. 
          Every user is entitled to the following:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="mb-4">
          You are advised to review this Privacy Policy periodically for any changes. 
          Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>By email: sangmlee23@gmail.com</li>
        </ul>
      </section>
      
      <footer className="text-sm text-muted-foreground">
        <p>Last updated: September 22, 2025</p>
      </footer>
    </main>
  );
}
