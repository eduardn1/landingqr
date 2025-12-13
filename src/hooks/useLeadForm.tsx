import { useState, createContext, useContext, ReactNode } from "react";

interface LeadFormContextType {
  isOpen: boolean;
  source: string;
  openLeadForm: (source?: string) => void;
  closeLeadForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export const LeadFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("website");

  const openLeadForm = (src: string = "website") => {
    setSource(src);
    setIsOpen(true);
  };

  const closeLeadForm = () => {
    setIsOpen(false);
  };

  return (
    <LeadFormContext.Provider value={{ isOpen, source, openLeadForm, closeLeadForm }}>
      {children}
    </LeadFormContext.Provider>
  );
};

export const useLeadForm = () => {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return context;
};
