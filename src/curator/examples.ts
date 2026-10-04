import type { CuratorInput } from "./contracts";

/** Fictional examples: no account data and no precomputed model verdicts. */
export const curatorExamples: { name: string; input: CuratorInput }[] = [
  {
    name: "Annual savings offer",
    input: {
      version: 1,
      title: "Offer annual savings at upgrade",
      sourceName: "Example workspace",
      referenceKind: "screenshot",
      observations: [
        {
          id: "o1",
          text: "An existing monthly subscriber has selected an upgrade to a larger paid plan.",
        },
        {
          id: "o2",
          text: "Before confirmation, a modal offers: ‘Switch to annual billing and save 20%.’ It shows the total charged today and says the plan renews annually.",
        },
        {
          id: "o3",
          text: "The modal offers ‘Choose annual’ and ‘Continue monthly’ actions. No countdown or deadline is shown.",
        },
        {
          id: "o4",
          text: "The surrounding account navigation and current plan details remain visible behind the modal. No completed purchase or measured business result was observed.",
        },
      ],
      components: [
        {
          id: "c1",
          text: "Annual-savings modal: 20% saving, annual total, renewal terms, and billing-cadence choices.",
        },
        {
          id: "c2",
          text: "Account navigation with profile, settings, and billing links.",
        },
        { id: "c3", text: "Current plan summary behind the modal." },
      ],
      actions: [
        { id: "a1", text: "Choose annual billing for the upgraded plan." },
        { id: "a2", text: "Continue with monthly billing." },
      ],
      explicitInclusion: false,
    },
  },
  {
    name: "Ordinary settings form",
    input: {
      version: 1,
      title: "Change a profile name",
      sourceName: "Example workspace",
      referenceKind: "screenshot",
      observations: [
        {
          id: "o1",
          text: "An existing user is on Profile settings. There are display-name and timezone fields, with a Save button.",
        },
        {
          id: "o2",
          text: "The page shows required-field validation and a saved confirmation. It contains no offer, reward, adoption prompt, invitation, paid gate, or first-use onboarding.",
        },
      ],
      components: [
        { id: "c1", text: "Display-name input and timezone selector." },
        { id: "c2", text: "Save button, validation, and saved confirmation." },
      ],
      actions: [{ id: "a1", text: "Save the edited profile settings." }],
      explicitInclusion: false,
    },
  },
  {
    name: "Missing context",
    input: {
      version: 1,
      title: "A cropped Continue button",
      sourceName: "Example crop",
      referenceKind: "screenshot",
      observations: [
        {
          id: "o1",
          text: "The reference is cropped to a button labelled ‘Continue’. The surrounding page, audience, trigger, proposition, and destination are missing.",
        },
      ],
      components: [
        {
          id: "c1",
          text: "A Continue button with no visible surrounding context.",
        },
      ],
      actions: [
        { id: "a1", text: "Press Continue; the next state is unobserved." },
      ],
      explicitInclusion: false,
    },
  },
];
