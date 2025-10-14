"use client";

import { useRouter } from "next/navigation";
import { FAQ, FAQItem } from "../../ui/FAQ";
import { ContactIcon } from "../../ui/Icons";

const faqData: FAQItem[] = [
  {
    question: "How are my drafts saved?",
    answer: "All drafts are auto-saved every 2 seconds. If you close the app or lose connection, your work will be restored when you log back in."
  },
  {
    question: "Can I edit the AI-generated narratives or SMFs?",
    answer: "Yes, you can fully edit and customize any AI-generated content. All narratives and SMFs are editable, and your changes will be saved automatically."
  },
  {
    question: "Where are my exported documents stored?",
    answer: "Exported documents are stored securely in your account and can be accessed from the Documents & Data section in Settings. You can download them anytime."
  },
  {
    question: "Does the chatbot give legal advice?",
    answer: "No, the chatbot provides information and assistance with document preparation but does not provide legal advice. Always consult with a qualified attorney for legal matters."
  }
];

export const HelpPage = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/settings/contact');
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-primary font-dm-sans">
            Help
          </h1>
          <p className="text-text-gray text-lg font-medium font-dm-sans">
            Find guides or report issues.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-primary font-dm-sans mb-4">
            Contact us
          </h2>
          
          <div 
            className="bg-light-gray rounded-lg border border-placeholder-gray/20 p-4 cursor-pointer hover:bg-placeholder-gray/10 transition-colors duration-200"
            onClick={handleContactClick}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-icons-bg rounded-full flex items-center justify-center flex-shrink-0">
                <ContactIcon />
              </div>
              <div>
                <p className="text-md font-medium text-blue-primary font-dm-sans">
                  Email us (it@shieldsystems.com)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-primary font-dm-sans mb-4">
            FAQ&apos;s
          </h2>
          
          <FAQ items={faqData} />
        </div>
      </div>
    </div>
  );
};