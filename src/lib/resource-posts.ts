import { siteMedia, type SiteImage } from "@/lib/site-media";

export type ResourcePost = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  dek: string;
  image: SiteImage;
  href: string;
  sourceAsset: string;
  originalUrl?: string;
  takeaways: string[];
  sections: {
    heading: string;
    body: string;
  }[];
};

const resourcePath = (slug: string) => `/resources/${slug}`;

export const resourcePosts: ResourcePost[] = [
  {
    slug: "5-marketing-mistakes-shop-owners-make",
    date: "Jul 2023",
    tag: "Guide",
    title: "5 Marketing Mistakes Shop Owners Make & How to Fix Them",
    description:
      "A Turnkey resource for shop owners who want to spot common marketing leaks and correct them.",
    dek: "A practical checklist for spotting common marketing problems before they turn into wasted spend, weak calls, or confusing vendor conversations.",
    image: siteMedia.graphics.leadGenerator,
    href: resourcePath("5-marketing-mistakes-shop-owners-make"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/07/lead-generator-web-graphic.png",
    takeaways: [
      "Marketing needs one accountable plan, not disconnected tactics.",
      "Tracking should explain what to keep, fix, stop, and run next.",
      "The best fixes are usually practical: clearer offers, better follow-up, and cleaner reporting.",
    ],
    sections: [
      {
        heading: "The mistake is not always spending too much.",
        body: "Many shops are already investing in mail, Google, reviews, social, CRM, or ads. The problem is that each channel is often judged separately, so the owner still has to figure out what is actually moving calls and cars.",
      },
      {
        heading: "The fix is a single scoreboard.",
        body: "A useful marketing plan connects calls, booked appointments, customer mix, retention, and spend. That makes the next move easier to defend because every channel is working toward the same shop goal.",
      },
    ],
  },
  {
    slug: "direct-mail-for-repair-shops",
    date: "Jun 2023",
    tag: "Direct Mail",
    title: "Why Direct Mail Still Works for Repair Shops",
    description:
      "A Turnkey direct mail resource graphic from the original site, built around shop-owner acquisition campaigns.",
    dek: "Direct mail still earns a place when the list, offer, timing, and follow-up are treated like a campaign instead of a print order.",
    image: siteMedia.graphics.directMail,
    href: resourcePath("direct-mail-for-repair-shops"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/06/2023-06-27-blog-RW-direct-mail.png",
    takeaways: [
      "Direct mail works best with a specific market, message, offer, and timing.",
      "Tracking matters because mail should be judged by calls, appointments, and customer quality.",
      "Mail is strongest when it is connected to digital, CRM, and follow-up.",
    ],
    sections: [
      {
        heading: "A mailer is not the strategy.",
        body: "The postcard is only one piece. The real work is deciding who should receive it, what problem the offer solves, when it should land, and how the shop follows up when demand starts coming in.",
      },
      {
        heading: "The best campaigns connect channels.",
        body: "Mail can support new customer acquisition, second-location growth, customer reactivation, and dense-market visibility. It works harder when call tracking and follow-up are connected from the start.",
      },
    ],
  },
  {
    slug: "auto-repair-marketing-plan",
    date: "Jan 2023",
    tag: "Planning",
    title: "How to Think About an Auto Repair Marketing Plan",
    description:
      "A practical marketing plan framework for aligning goals, tactics, messages, and measurement.",
    dek: "A marketing plan should make budget decisions clearer, vendor conversations easier, and the next move less dependent on guesswork.",
    image: siteMedia.graphics.marketingPlan,
    href: resourcePath("auto-repair-marketing-plan"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/marketing-plan2.png",
    takeaways: [
      "Start with the shop goal, not the channel.",
      "Separate growth, retention, reputation, and capacity questions.",
      "Use reporting to decide the next move, not just prove activity happened.",
    ],
    sections: [
      {
        heading: "The plan has to match the shop.",
        body: "A shop trying to ramp a second location needs a different marketing rhythm than a full shop trying to improve customer quality. The plan should reflect capacity, market, advisor follow-through, and the work the owner wants more of.",
      },
      {
        heading: "The next move should be obvious.",
        body: "Good reporting should make it clear what deserves more budget, what needs fixing, and what should stop. That is where marketing starts feeling manageable instead of scattered.",
      },
    ],
  },
  {
    slug: "why-auto-repair-marketing-breaks",
    date: "Mar 2023",
    tag: "Strategy",
    title: "Why Auto Repair Marketing Breaks Down",
    description:
      "A Turnkey visual resource for diagnosing the problems that keep a shop marketing plan from working.",
    dek: "When marketing feels hard to trust, the issue is often unclear ownership: too many vendors, too many reports, and no one responsible for the whole board.",
    image: siteMedia.graphics.problems,
    href: resourcePath("why-auto-repair-marketing-breaks"),
    sourceAsset: "https://turnkeyautomarketing.com/wp-content/uploads/2023/03/problems.png",
    takeaways: [
      "Disconnected vendors create extra owner work.",
      "A shop needs reporting that explains customer movement, not just channel activity.",
      "Marketing leadership means owning the decision, not handing more homework to the owner.",
    ],
    sections: [
      {
        heading: "The owner becomes the connector.",
        body: "When every vendor reports in its own lane, the owner still has to connect spend, calls, appointments, capacity, and customer quality. That is usually where momentum slows down.",
      },
      {
        heading: "Leadership removes the drag.",
        body: "The better path is one team coordinating vendors, campaigns, reporting, and next steps. The owner should understand the why without having to manage every small decision.",
      },
    ],
  },
  {
    slug: "jason-smith-marketing-plan",
    date: "Jan 2023",
    tag: "Client Proof",
    title: "Jason Smith Marketing Plan",
    description:
      "A source-site client proof graphic about creating a yearly marketing plan with Turnkey.",
    dek: "A client-proof example of why yearly planning matters when a shop wants marketing to support growth instead of reacting month to month.",
    image: siteMedia.graphics.jasonSmithPlan,
    href: resourcePath("jason-smith-marketing-plan"),
    sourceAsset:
      "https://turnkeyautomarketing.com/wp-content/uploads/2023/01/jason-smith-marketing-plan.png",
    takeaways: [
      "Long-term growth needs a visible plan.",
      "The owner should not have to invent the marketing calendar alone.",
      "The strongest plan connects campaigns, reporting, and accountability.",
    ],
    sections: [
      {
        heading: "Growth needs a calendar.",
        body: "A yearly marketing plan gives the shop a rhythm for acquisition, retention, reputation, seasonal pushes, and budget decisions. It also keeps the owner from having to restart the strategy conversation every month.",
      },
      {
        heading: "Accountability keeps it useful.",
        body: "The plan only matters if someone owns execution and reporting. That is where a marketing team can remove the burden from the shop owner while still keeping the direction clear.",
      },
    ],
  },
];

export const getResourcePost = (slug: string) => resourcePosts.find((post) => post.slug === slug);
