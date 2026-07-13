import { siteMedia } from "@/lib/site-media";

export const resourcePosts = [
  {
    date: "Jul 2023",
    tag: "Guide",
    title: "5 Marketing Mistakes Shop Owners Make & How to Fix Them",
    description:
      "A Turnkey resource for shop owners who want to spot common marketing leaks and correct them.",
    image: siteMedia.graphics.leadGenerator,
    href: "/resources",
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/07/lead-generator-web-graphic.png",
  },
  {
    date: "Jun 2023",
    tag: "Direct Mail",
    title: "Ratchet+Wrench: Direct Mail",
    description:
      "A Turnkey direct mail resource graphic from the original site, built around shop-owner acquisition campaigns.",
    image: siteMedia.graphics.directMail,
    href: "/resources",
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/06/2023-06-27-blog-RW-direct-mail.png",
  },
  {
    date: "Jan 2023",
    tag: "Planning",
    title: "Marketing Plan",
    description:
      "A practical marketing plan framework for aligning goals, tactics, messages, and measurement.",
    image: siteMedia.graphics.marketingPlan,
    href: "/resources",
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/marketing-plan2.png",
  },
  {
    date: "Mar 2023",
    tag: "Strategy",
    title: "Problems",
    description:
      "A Turnkey visual resource for diagnosing the problems that keep a shop marketing plan from working.",
    image: siteMedia.graphics.problems,
    href: "/resources",
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/03/problems.png",
  },
  {
    date: "Jan 2023",
    tag: "Client Proof",
    title: "Jason Smith Marketing Plan",
    description:
      "A source-site client proof graphic about creating a yearly marketing plan with Turnkey.",
    image: siteMedia.graphics.jasonSmithPlan,
    href: "/resources",
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/jason-smith-marketing-plan.png",
  },
] as const;
