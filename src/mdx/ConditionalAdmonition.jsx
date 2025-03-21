import Admonition from "@theme/Admonition";
import Markdown from "react-markdown";

// The purpose of this component is to conditionally render an admonition based
// on a date. The date is a string in the format of "YYYY-MM-DD".
//
// IMPORTANT: Rendering happens based on UTC time during build
// (GitHub Actions runner) and requires a release on the date to be visible.
//
// Example usage:
// <ConditionalAdmonition type="warning" date="2025-04-09" text="Test: [**example**](/docs/self-managed/setup/deploy/amazon/amazon-eks/eks-terraform/)." />
//
// Useful for example during a release period where
// you want to implement the message already and not have to wait for the
// release branch.
// The text can be markdown formatted. Markdown links need to be
// the full path and don't adhere to the normal Docusaurus link resolution.

const ConditionalAdmonition = ({ date, text, ...props }) => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  return currentDate >= targetDate ? (
    <Admonition {...props}>
      <Markdown>{text}</Markdown>
    </Admonition>
  ) : null;
};

export default ConditionalAdmonition;
