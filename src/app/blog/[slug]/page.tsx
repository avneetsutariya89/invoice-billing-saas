"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/header";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  Home,
  BookOpen,
  Star,
} from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";

const blogPosts = {
  "how-to-split-bills-fairly": {
    id: 1,
    title: "How to Split Bills Fairly: A Complete Guide",
    excerpt: "Learn the best practices for splitting bills in groups, from simple dinners to complex trips. Discover fair methods that keep everyone happy.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Guide",
    image: "https://picsum.photos/seed/bill-splitting-guide/800/400",
    content: `
# How to Split Bills Fairly: A Complete Guide

Splitting bills can be one of the most awkward aspects of group activities. Whether you're dining out with friends, planning a group vacation, or managing household expenses with roommates, getting the math right is crucial for maintaining healthy relationships.

## Why Fair Bill Splitting Matters

Money has a unique way of complicating even the strongest friendships. When bills aren't split fairly, resentment can build up over time, leading to strained relationships and uncomfortable situations. Fair bill splitting isn't just about mathematics—it's about respect, transparency, and maintaining harmony in your social circles.

## Common Bill Splitting Methods

### 1. Equal Split (Simple Division)
The most straightforward method where everyone pays the same amount, regardless of what they consumed.

**Best for:**
- Simple restaurant bills where everyone ordered similar items
- Group activities with shared costs
- Quick calculations

**Example:** \$120 total bill ÷ 4 people = \$30 per person

### 2. Proportional Split (Based on Consumption)
Each person pays exactly what they consumed plus their share of shared costs.

**Best for:**
- Restaurant bills with varying orders
- Shopping trips with different purchases
- When fairness is more important than simplicity

### 3. Income-Based Split
People contribute based on their income levels, with higher earners paying more.

**Best for:**
- Long-term living situations
- Groups with significant income disparities
- When prioritizing equity over equality

## Best Practices for Fair Bill Splitting

### 1. Communicate Upfront
Before any activity, discuss how you'll split expenses. This prevents misunderstandings later.

### 2. Use Technology
Leverage bill splitting apps and calculators to avoid manual errors and maintain transparency.

### 3. Keep Receipts
Always keep detailed receipts to reference when calculating splits.

### 4. Be Flexible
Sometimes perfect mathematical fairness isn't worth the friendship cost. Be willing to compromise.

### 5. Settle Quickly
Don't let debts linger. Settle up as soon as possible to avoid awkwardness.

## Common Pitfalls to Avoid

- **Forgetting shared costs:** Don't forget to include tax, tips, and shared items
- **Ignoring dietary restrictions:** Account for different meal prices and restrictions
- **Overcomplicating:** Sometimes simple is better
- **Assuming:** Never assume someone's financial situation or preferences

## Tools That Help

Modern bill splitting tools can automate calculations and track debts over time. Our calculator, for instance, uses advanced algorithms to determine the minimal number of transactions needed to settle all debts fairly.

## Conclusion

Fair bill splitting is both an art and a science. While the math needs to be correct, the human element is equally important. By communicating clearly, using the right tools, and maintaining flexibility, you can ensure that group expenses bring you closer together rather than driving you apart.

Remember: the goal isn't just to split bills—it's to maintain relationships while being fair to everyone involved.
    `, 
    likes: 38,
    relatedPosts: [2, 3, 4]
  },
  "how-to-split-bills-fairly-guide": {
    id: 6,
    title: "How to Split Bills Fairly: Complete Guide 2024",
    excerpt: "Master the art of fair bill splitting with our comprehensive guide. Learn proven methods for group dinners, trips, and shared expenses to keep friendships strong.",
    author: "Sarah Johnson",
    date: "March 28, 2024",
    readTime: "8 min read",
    category: "Bill Splitting",
    image: "https://picsum.photos/seed/bill-splitting-fair/800/400",
    content: `
# How to Split Bills Fairly: Complete Guide 2024

Splitting bills can be one of the most awkward aspects of group activities. Whether you're dining out with friends, planning a group vacation, or managing household expenses with roommates, getting the math right is crucial for maintaining healthy relationships.

## Why Fair Bill Splitting Matters

Money has a unique way of complicating even the strongest friendships. When bills aren't split fairly, resentment can build up over time, leading to strained relationships and uncomfortable situations. Fair bill splitting isn't just about mathematics—it's about respect, transparency, and maintaining harmony in your social circles.

## Common Bill Splitting Methods

### 1. Equal Split (Simple Division)
The most straightforward method where everyone pays the same amount, regardless of what they consumed.

**Best for:**
- Simple restaurant bills where everyone ordered similar items
- Group activities with shared costs
- Quick calculations

**Example:** \$120 total bill ÷ 4 people = \$30 per person

### 2. Proportional Split (Based on Consumption)
Each person pays exactly what they consumed plus their share of shared costs.

**Best for:**
- Restaurant bills with varying orders
- Shopping trips with different purchases
- When fairness is more important than simplicity

### 3. Income-Based Split
People contribute based on their income levels, with higher earners paying more.

**Best for:**
- Long-term living situations
- Groups with significant income disparities
- When prioritizing equity over equality

## Best Practices for Fair Bill Splitting

### 1. Communicate Upfront
Before any activity, discuss how you'll split expenses. This prevents misunderstandings later.

### 2. Use Technology
Leverage bill splitting apps and calculators to avoid manual errors and maintain transparency.

### 3. Keep Receipts
Always keep detailed receipts to reference when calculating splits.

### 4. Be Flexible
Sometimes perfect mathematical fairness isn't worth the friendship cost. Be willing to compromise.

### 5. Settle Quickly
Don't let debts linger. Settle up as soon as possible to avoid awkwardness.

## Common Pitfalls to Avoid

- **Forgetting shared costs:** Don't forget to include tax, tips, and shared items
- **Ignoring dietary restrictions:** Account for different meal prices and restrictions
- **Overcomplicating:** Sometimes simple is better
- **Assuming:** Never assume someone's financial situation or preferences

## Tools That Help

Modern bill splitting tools can automate calculations and track debts over time. Our calculator, for instance, uses advanced algorithms to determine the minimal number of transactions needed to settle all debts fairly.

## Conclusion

Fair bill splitting is both an art and a science. While the math needs to be correct, the human element is equally important. By communicating clearly, using the right tools, and maintaining flexibility, you can ensure that group expenses bring you closer together rather than driving you apart.

Remember: the goal isn't just to split bills—it's to maintain relationships while being fair to everyone involved.
    `,
    likes: 63,
    relatedPosts: [7, 8, 9]
  },
  "common-bill-splitting-mistakes": {
    id: 2,
    title: "5 Common Bill Splitting Mistakes to Avoid",
    excerpt: "Don't let money ruin your friendships. Learn about the most common mistakes people make when splitting bills and how to avoid them.",
    author: "Mike Chen",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Tips",
    image: "https://picsum.photos/seed/bill-mistakes/800/400",
    content: `
# 5 Common Bill Splitting Mistakes to Avoid

Money and friendships can be a tricky combination. Even with the best intentions, it's easy to make mistakes when splitting bills that can lead to awkward situations or damaged relationships. Here are the five most common mistakes and how to avoid them.

## 1. Forgetting Hidden Costs

**The Mistake:** Only splitting the main bill items while forgetting taxes, tips, delivery fees, or other附加费用.

**Why It's a Problem:** These "small" costs can add up significantly and create imbalances that build resentment over time.

**How to Avoid It:**
- Always include the total amount including tax and tip
- Account for delivery fees, service charges, and other extras
- Use a calculator that handles the complete bill

## 2. The "I'll Get It Next Time" Trap

**The Mistake:** One person consistently pays more with the vague promise of "I'll get it next time," which never comes.

**Why It's a Problem:** This creates an unspoken debt that can grow uncomfortable and lead to resentment.

**How to Avoid It:**
- Settle up immediately or set a clear timeline
- Use bill splitting apps to track who owes whom
- Be honest if you can't afford to contribute equally right now

## 3. Ignoring Different Consumption Levels

**The Mistake:** Splitting everything equally when people clearly consumed different amounts.

**Why It's a Problem:** It's fundamentally unfair and can breed resentment, especially when the difference is significant.

**How to Avoid It:**
- Track individual orders when there are big differences
- Use proportional splitting for meals with varying costs
- Consider the context—equal splits might be fine for casual outings

## 4. Poor Communication

**The Mistake:** Not discussing payment expectations upfront or avoiding money conversations entirely.

**Why It's a Problem:** Assumptions lead to misunderstandings, and avoiding the topic doesn't make it go away.

**How to Avoid It:**
- Discuss payment methods before the activity
- Be clear about what will be split and how
- Don't be afraid to have respectful money conversations

## 5. Letting Debts Linger

**The Mistake:** Not settling up promptly, letting small debts accumulate over time.

**Why It's a Problem:** Small debts can grow into significant amounts, and the longer they linger, the more awkward they become to address.

**How to Avoid It:**
- Settle up within 24-48 hours when possible
- Use payment apps for easy transfers
- Keep track of ongoing balances

## The Psychology Behind These Mistakes

Many of these mistakes stem from:
- **Conflict avoidance:** We'd rather be "nice" than have awkward conversations
- **Optimism bias:** Assuming things will "work themselves out"
- **Social pressure:** Not wanting to seem cheap or demanding
- **Cognitive overload:** Simply forgetting in the moment

## Building Better Habits

1. **Be proactive:** Discuss money matters before they become issues
2. **Use tools:** Leverage technology to track and calculate
3. **Stay organized:** Keep receipts and track expenses
4. **Communicate openly:** Have respectful conversations about money
5. **Settle promptly:** Don't let debts accumulate

## Conclusion

Avoiding these common mistakes isn't about being perfect—it's about being considerate and fair. Good bill splitting habits strengthen relationships rather than straining them. Remember, the goal is to enjoy time together without money stress getting in the way.

By being mindful of these pitfalls and implementing better practices, you can ensure that group expenses bring you closer together rather than driving you apart.
    `,
    likes: 56,
    relatedPosts: [1, 5, 6]
  },
  "mathematics-behind-bill-splitting": {
    id: 3,
    title: "The Mathematics Behind Fair Bill Splitting",
    excerpt: "Ever wondered how our calculator determines who owes whom? Dive into the math behind optimal debt settlement algorithms.",
    author: "Dr. Emily Brown",
    date: "March 5, 2024",
    readTime: "8 min read",
    category: "Technical",
    image: "https://picsum.photos/seed/math-bill-splitting/800/400",
    content: `
# The Mathematics Behind Fair Bill Splitting

Have you ever wondered how bill splitting calculators determine who should pay whom? Behind the simple interface lies a fascinating world of mathematical algorithms designed to find the most efficient way to settle group debts.

## The Problem: Optimal Debt Settlement

Given a group of people who have spent different amounts, how do we determine the minimal number of transactions needed to settle all debts fairly?

This isn't just a simple division problem—it's a complex optimization challenge that has intrigued mathematicians and computer scientists for decades.

## Mathematical Foundations

### Balance Calculation

First, we calculate each person's balance:

**Balance = Amount Spent - Average Share**

Where:
- **Amount Spent**: What the person actually paid
- **Average Share**: Total Amount ÷ Number of People

Positive balances mean the person is owed money, negative balances mean they owe money.

### Example Calculation

Let's say 4 friends went to dinner:
- Alice paid \$80
- Bob paid \$40
- Carol paid \$20
- David paid \$60

Total: \$200
Average per person: \$50

Balances:
- Alice: \$80 - \$50 = +\$30 (owed \$30)
- Bob: \$40 - \$50 = -\$10 (owes \$10)
- Carol: \$20 - \$50 = -\$30 (owes \$30)
- David: \$60 - \$50 = +\$10 (owed \$10)

## The Algorithm: Greedy Approach

The most common approach is the "greedy algorithm," which works as follows:

1. **Separate debtors and creditors**
   - Debtors: Those with negative balances
   - Creditors: Those with positive balances

2. **Match largest debts with largest credits**
   - Sort debtors by amount owed (ascending)
   - Sort creditors by amount owed (descending)

3. **Settle one pair at a time**
   - Take the person who owes the most
   - Match them with the person who is owed the most
   - Settle the minimum of these two amounts
   - Update balances and repeat

### Applying to Our Example

Debtors (sorted):
- Carol owes \$30
- Bob owes \$10

Creditors (sorted):
- Alice is owed \$30
- David is owed \$10

**Transaction 1:** Carol pays Alice \$30
- Carol: -\$30 + \$30 = \$0 (settled)
- Alice: +\$30 - \$30 = \$0 (settled)

**Transaction 2:** Bob pays David \$10
- Bob: -\$10 + \$10 = \$0 (settled)
- David: +\$10 - \$10 = \$0 (settled)

**Result:** Only 2 transactions needed!

## Advanced Algorithms

### The Hungarian Algorithm

For more complex scenarios, the Hungarian algorithm can find the optimal matching between debtors and creditors to minimize the number of transactions.

### Network Flow Theory

Some advanced implementations treat this as a minimum cost flow problem, using network flow algorithms to find optimal solutions.

## Mathematical Properties

### Minimality

The greedy approach guarantees the minimal number of transactions in most cases because it always settles the largest possible amount in each transaction.

### Fairness

The mathematical approach ensures:
- Everyone ends up with a zero balance
- No one pays more than they owe
- No one receives less than they're owed

## Computational Complexity

The time complexity is O(n log n) due to the sorting step, where n is the number of people. This is very efficient even for large groups.

## Edge Cases and Special Considerations

### Ties and Rounding
When amounts don't divide evenly, rounding strategies become important. Our calculator uses rounding to the nearest cent.

### Multiple Settlement Options
Sometimes there are multiple ways to settle with the same number of transactions. The algorithm typically chooses the most straightforward path.

### Partial Payments
In real-world scenarios, people might want to make partial payments or settle in installments, adding complexity to the mathematical model.

## Practical Applications

This mathematics extends beyond simple bill splitting:

- **Roommate expense sharing**
- **Business partnership accounting**
- **International debt settlement**
- **Cryptocurrency transaction optimization**

## Conclusion

The mathematics behind bill splitting combines elegance with practical utility. What appears as a simple interface actually implements sophisticated algorithms that have been refined over decades of research.

Next time you use a bill splitting calculator, appreciate the mathematical machinery working behind the scenes to ensure fairness and efficiency in your social financial interactions.

Understanding these principles not only helps you trust the tools you use but also gives you insight into how mathematical thinking can solve everyday problems.
    `,
    likes: 72,
    relatedPosts: [1, 2, 6]
  },
  "group-travel-budget": {
    id: 4,
    title: "Group Travel Budget: How to Plan and Split Expenses",
    excerpt: "Planning a group trip? Learn how to budget effectively and split expenses fairly among travelers for a stress-free vacation.",
    author: "Alex Rivera",
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "Travel",
    image: "https://picsum.photos/seed/travel-budget/800/400",
    content: `
# Group Travel Budget: How to Plan and Split Expenses

Planning a group trip can be one of life's greatest joys—or one of its biggest headaches. The difference often comes down to how well you handle the money aspect. Here's your comprehensive guide to budgeting and splitting expenses for stress-free group travel.

## Pre-Trip Planning

### 1. Set Expectations Early

Before booking anything, have an open conversation about:
- Budget ranges for each person
- What expenses will be shared vs. individual
- Payment preferences and capabilities
- Comfort levels with different accommodation types

### 2. Create a Shared Budget Template

Use a spreadsheet or app to track:
- **Transportation**: Flights, trains, car rentals, gas
- **Accommodation**: Hotels, vacation rentals, hostels
- **Food**: Groceries, restaurants, special meals
- **Activities**: Tours, tickets, excursions
- **Miscellaneous**: Souvenirs, tips, emergency funds

### 3. Establish a Group Fund

Consider creating a shared pool for common expenses:
- Each person contributes an equal amount
- Use the fund for shared meals, group activities, transportation
- Keep detailed records of all withdrawals
- Refund any remaining money at the end

## Common Group Travel Expenses

### Transportation Costs

**Splitting Strategy:**
- **Flights**: Usually individual responsibility
- **Car Rentals**: Split among passengers + fuel costs
- **Public Transport**: Split among users
- **Taxis/Rideshares**: Split among passengers

**Pro Tip:** Use apps like Splitwise or Tricount to track transportation costs in real-time.

### Accommodation

**Options:**
- **Equal split**: Everyone pays the same regardless of room differences
- **Room-based split**: Different rates for different room types
- **Per-night calculation**: Daily rates for transparency

**Example:** \$200/night vacation rental
- 2 people in master bedroom: \$70/night each
- 2 people in smaller rooms: \$30/night each

### Food and Dining

**Strategies:**
- **Group meals**: Split evenly
- **Individual meals**: Pay your own way
- **Groceries**: Split or rotate who pays
- **Special dietary needs**: Account for price differences

### Activities and Entertainment

**Consider:**
- **Everyone participates**: Split evenly
- **Optional activities**: Only participants pay
- **Different interests**: Allow for individual choices
- **Group discounts**: Pass savings to all participants

## On-the-Trip Management

### Daily Tracking

Keep track of expenses daily:
- Use a shared spreadsheet or app
- Take photos of receipts
- Note who paid what
- Update balances regularly

### Payment Methods

**Recommended:**
- **Digital apps**: Venmo, PayPal, Splitwise
- **Shared credit card**: For group bookings
- **Cash envelope**: For small daily expenses
- **Individual responsibility**: For personal items

### Regular Check-ins

Have brief money check-ins:
- Daily expense reviews
- Balance updates
- Upcoming expense planning
- Address any concerns immediately

## Common Challenges and Solutions

### Different Budget Levels

**Problem:** Some travelers have significantly different budgets.

**Solutions:**
- Offer tiered accommodation options
- Plan free/low-cost activities
- Be flexible about dining choices
- Consider individual payment for expensive items

### Last-Minute Changes

**Problem:** Plans change, affecting costs.

**Solutions:**
- Build in a contingency fund (5-10%)
- Have a clear policy for changes
- Communicate changes immediately
- Adjust splits fairly

### Currency Differences

**Problem:** International travel with different currencies.

**Solutions:**
- Agree on a base currency
- Use current exchange rates
- Account for conversion fees
- Consider currency fluctuations

## Post-Trip Settlement

### Final Accounting

1. **Compile all expenses**: Gather every receipt and record
2. **Calculate final balances**: Determine who owes whom
3. **Settle debts**: Use preferred payment methods
4. **Share records**: Everyone gets a copy of final accounting

### Settlement Timeline

**Recommended:**
- **Within 48 hours**: Initial settlement
- **Within 1 week**: All debts cleared
- **Final review**: Everyone confirms accuracy

## Technology Tools

### Recommended Apps

- **Splitwise**: Excellent for ongoing expense tracking
- **Tricount**: Great for trip-specific expenses
- **Google Sheets**: Customizable and free
- **Excel**: Advanced calculations and analysis

### Features to Look For

- Real-time updates
- Multiple currency support
- Receipt photo storage
- Payment integration
- Export capabilities

## Pro Tips for Smooth Group Travel

1. **Overcommunicate**: Better too much information than too little
2. **Be flexible**: Plans change, adapt gracefully
3. **Document everything**: Photos of receipts prevent disputes
4. **Settle quickly**: Don't let debts linger
5. **Choose the right people**: Travel with financially responsible friends

## Sample Budget Template

| Category | Estimated Cost | Actual Cost | Paid By | Split Method |
|----------|----------------|-------------|---------|-------------|
| Accommodation | \$800 | \$750 | Alex | Equal split |
| Car Rental | \$300 | \$320 | Sarah | Per person |
| Groceries | \$200 | \$180 | Mike | Equal split |
| Restaurants | \$500 | \$550 | Various | Individual |
| Activities | \$400 | \$380 | Group | Participants only |

## Conclusion

Successful group travel budgeting is about planning, communication, and flexibility. By setting expectations early, using the right tools, and maintaining open communication, you can focus on making memories rather than managing money disputes.

Remember: The goal is to enjoy the trip together, not to achieve perfect mathematical fairness. Sometimes the best solution is one that keeps everyone happy and the friendship intact.

Happy travels!
    `,
    likes: 44,
    relatedPosts: [6, 7, 9]
  },
  "roommate-bill-splitting-guide": {
    id: 9,
    title: "Roommate Bill Splitting: Avoid Common Conflicts",
    excerpt: "Living with roommates? Essential guide to splitting rent, utilities, and shared expenses without drama. Practical tips for peaceful cohabitation.",
    author: "David Kim",
    date: "March 22, 2024",
    readTime: "5 min read",
    category: "Living Expenses",
    image: "https://picsum.photos/seed/roommate-bills/800/400",
    content: `
# Roommate Bill Splitting: Avoid Common Conflicts

Living with roommates can be an amazing way to save money and build lasting friendships—or it can be a nightmare of financial disputes and awkward conversations. The difference often comes down to how you handle shared expenses.

## Common Roommate Expenses

### Fixed Monthly Bills

**Rent/Mortgage**
- **Equal split**: Most common and straightforward
- **Room-based**: Different rates for different room sizes
- **Income-based**: Proportional to income levels
- **Private room premium**: Extra for larger/better rooms

**Utilities**
- Electricity, gas, water: Usually equal split
- Internet/cable: Equal split, regardless of usage
- Streaming services: Split among users

### Variable Expenses

**Groceries**
- **Shared items**: Split evenly (milk, bread, condiments)
- **Personal items**: Individual responsibility
- **Meal planning**: Rotate cooking responsibilities
- **Shopping trips**: Take turns or split receipts

**Household Supplies**
- Cleaning supplies: Equal split
- Toilet paper, soap: Equal split
- Kitchen tools: Shared investment or individual

**Maintenance and Repairs**
- Wear and tear: Landlord responsibility
- Damage costs: Person responsible pays
- Improvements: Agreement needed beforehand

## Splitting Methods

### 1. Equal Split Method

Everyone pays the same amount, regardless of usage or room differences.

**Pros:**
- Simple and easy to calculate
- Perceived as fair
- No complex tracking needed

**Cons:**
- Doesn't account for usage differences
- Can feel unfair to those who use less
- May encourage overuse

**Best for:**
- Similar room sizes
- Similar usage patterns
- Groups that value simplicity over precision

### 2. Usage-Based Splitting

Track actual usage and split accordingly.

**Pros:**
- Mathematically fair
- Encourages conscious consumption
- Reduces resentment

**Cons:**
- Complex to track
- Can lead to micromanagement
- Time-consuming

**Best for:**
- Significant usage differences
- Tech-savvy roommates
- Long-term living situations

### 3. Hybrid Approach

Combine equal splits for some items and usage-based for others.

**Example:**
- Rent: Equal split
- Electricity: Usage-based with smart plugs
- Groceries: Equal for shared items, individual for personal
- Internet: Equal split

## Implementation Strategies

### The Joint Account Method

Open a shared bank account for household expenses:

**Setup:**
- Each roommate contributes equal amount monthly
- Use account for all shared expenses
- One person manages payments
- Regular statements and reconciliations

**Pros:**
- Simplifies payments
- Clear tracking
- Reduces individual payment responsibility

**Cons:**
- Requires trust
- Needs good organization
- Initial setup complexity

### The App-Based Method

Use expense splitting apps:

**Popular Apps:**
- Splitwise: Free, easy to use
- Tricount: Good for ongoing expenses
- Zelle: Direct payments
- Venmo: Social payment features

**Features:**
- Real-time balance tracking
- Receipt photo storage
- Payment reminders
- Monthly summaries

### The Spreadsheet Method

Custom tracking with Google Sheets or Excel:

**Setup:**
- Shared spreadsheet access
- Categories for different expense types
- Formulas for automatic calculations
- Monthly summary tabs

**Benefits:**
- Fully customizable
- No app dependencies
- Detailed tracking
- Export capabilities

## Common Challenges and Solutions

### Unequal Income Levels

**Problem:** Roommates have significantly different incomes.

**Solutions:**
- Income-proportional rent splitting
- Different room rates for different budgets
- Flexible payment schedules
- Focus on fairness over equality

### Different Lifestyles

**Problem:** Some roommates are home more, use more utilities.

**Solutions:**
- Usage-based utility splitting
- Smart home monitoring
- Regular usage reviews
- Adjusted contributions

### Guests and Partners

**Problem:** Frequent guests increase utility usage.

**Solutions:**
- Guest contribution policy
- Time-based utility adjustments
- Clear communication about expectations
- Occasional vs. long-term guests

### Irregular Expenses

**Problem:** Unexpected repairs or purchases.

**Solutions:**
- Emergency fund contributions
- Majority vote for large purchases
- Pre-agreed spending limits
- Repair responsibility guidelines

## Communication Best Practices

### Regular Money Meetings

**Frequency:** Monthly or bi-monthly
**Agenda:**
- Review recent expenses
- Discuss upcoming costs
- Address concerns
- Plan for changes

### Ground Rules

**Establish:**
- Payment deadlines
- Expense reporting procedures
- Dispute resolution process
- Guest policies

### Documentation

**Keep records of:**
- All receipts
- Payment confirmations
- Agreement changes
- Meeting notes

## Technology Solutions

### Smart Home Devices

**Energy Monitoring:**
- Smart plugs for individual tracking
- Thermostat usage monitoring
- Water usage sensors
- Automated expense logging

**Benefits:**
- Precise usage data
- Fair utility splitting
- Consumption awareness
- Cost reduction incentives

### Automated Payments

**Setup:**
- Automatic rent transfers
- Utility auto-pay
- Subscription management
- Regular contribution reminders

## Legal and Financial Considerations

### Roommate Agreements

**Include:**
- Rent responsibility
- Utility splitting method
- Guest policies
- Move-out procedures
- Deposit handling

### Financial Protection

**Consider:**
- Individual renter's insurance
- Emergency savings
- Credit score protection
- Legal consultation for complex situations

## Sample Monthly Budget

| Expense | Total | Person A | Person B | Person C | Split Method |
|---------|-------|----------|----------|----------|-------------|
| Rent | $1800 | $600 | $600 | $600 | Equal |
| Electricity | $120 | $45 | $35 | $40 | Usage-based |
| Internet | $60 | $20 | $20 | $20 | Equal |
| Groceries | $300 | $100 | $100 | $100 | Equal |
| Cleaning Supplies | $40 | $13.33 | $13.33 | $13.34 | Equal |
| **Total** | **$2320** | **$778.33** | **$768.33** | **$773.34** | |

## Tips for Success

1. **Start strong**: Establish systems from day one
2. **Communicate regularly**: Don't let issues build up
3. **Be flexible**: Life happens, be willing to adjust
4. **Use technology**: Apps and tools prevent disputes
5. **Document everything**: Paper trail prevents misunderstandings
6. **Review periodically**: Systems need maintenance
7. **Plan for changes**: Roommates move, situations change

## Conclusion

Fair roommate expense splitting isn't about mathematical perfection—it's about creating a harmonious living situation where everyone feels respected and treated fairly.

The best system is one that:
- Everyone understands and agrees to
- Is easy to maintain long-term
- Accommodates life changes
- Preserves friendships

Remember, the goal is to live together peacefully, not to achieve perfect financial equality. Sometimes the best solution is one that keeps the household happy and functional.

Choose the method that works for your specific situation, communicate openly, and be willing to adjust as needed. Your future self (and your roommates) will thank you.
    `,
    likes: 61,
    relatedPosts: [1, 2, 4]
  },
  "digital-vs-traditional-bill-splitting": {
    id: 10,
    title: "Digital Tools vs Traditional Methods for Bill Splitting",
    excerpt: "Compare digital bill splitting tools with traditional methods like spreadsheets and manual calculations. Find the best approach for your group.",
    author: "Sam Wilson",
    date: "February 15, 2024",
    readTime: "5 min read",
    category: "Comparison",
    image: "https://picsum.photos/seed/digital-traditional-splitting/800/400",
    content: `
# Digital Tools vs Traditional Methods for Bill Splitting

In today's digital age, we have more options than ever for splitting bills with friends and roommates. But are modern apps always better than traditional methods? Let's compare the approaches to help you choose what's best for your situation.

## Traditional Methods

### Pen and Paper

**How it works:**
- Write down who paid what
- Calculate totals manually
- Figure out who owes whom
- Settle up in cash or via bank transfer

**Pros:**
- No technology required
- Works anywhere, anytime
- Simple to understand
- No learning curve
- Free

**Cons:**
- Prone to calculation errors
- Easy to lose receipts/notes
- Time-consuming for complex splits
- Hard to track over time
- No backup if lost

**Best for:**
- Simple, one-time splits
- Small groups (2-3 people)
- Tech-averse individuals
- Emergency situations

### Spreadsheets (Excel/Google Sheets)

**How it works:**
- Create expense tracking tables
- Use formulas for calculations
- Share with group members
- Update regularly

**Pros:**
- Customizable to your needs
- Can handle complex calculations
- Good for ongoing tracking
- Export capabilities
- Free (Google Sheets)

**Cons:**
- Requires spreadsheet skills
- Manual data entry
- No automatic payment integration
- Can become complex quickly
- Version control issues

**Best for:**
- Roommate situations
- Ongoing expense tracking
- People comfortable with spreadsheets
- Groups wanting detailed records

### Envelope System

**How it works:**
- Use physical envelopes for different categories
- Put cash in envelopes for shared expenses
- Take money out as needed
- Replenish regularly

**Pros:**
- Tangible and visual
- Forces budgeting discipline
- No tracking needed
- Simple concept

**Cons:**
- Cash-only limitation
- Security concerns
- Inconvenient for online purchases
- Requires regular maintenance
- Not suitable for all situations

**Best for:**
- Cash-based households
- Budgeting beginners
- Small, regular expenses
- Visual learners

## Digital Tools

### Bill Splitting Apps

**Popular Options:**
- Splitwise
- Tricount
- Settle Up
- IOU

**How they work:**
- Input expenses and who paid
- App calculates who owes whom
- Send payment reminders
- Track balances over time

**Pros:**
- Automatic calculations
- Minimal transaction optimization
- Payment integration (Venmo, PayPal)
- Receipt photo storage
- Multi-currency support
- Cloud backup

**Cons:**
- Learning curve
- Internet required
- Privacy concerns
- Subscription fees for some features
- App dependency

**Best for:**
- Complex group situations
- Ongoing expense tracking
- Tech-savvy groups
- Multiple currency scenarios

### Payment Apps with Split Features

**Examples:**
- Venmo
- PayPal
- Zelle
- Cash App

**How they work:**
- Request money from multiple people
- Split payments automatically
- Social features for reminders
- Instant transfers

**Pros:**
- Integrated payment and splitting
- Fast settlements
- Social features
- Widely adopted
- Free for personal use

**Cons:**
- Limited expense tracking
- Basic splitting only
- Privacy concerns
- Transaction limits
- May not optimize settlements

**Best for:**
- Simple restaurant splits
- Quick settlements
- Social groups
- Mobile-first users

### Specialized Calculators

**Web-based calculators** (like ours)

**How they work:**
- Input amounts spent by each person
- Calculate optimal settlements
- Show who pays whom
- Provide instant results

**Pros:**
- No account required
- Advanced algorithms
- Privacy-focused
- Free to use
- Optimized for fairness

**Cons:**
- No ongoing tracking
- No payment integration
- One-time use only
- Limited to calculation only

**Best for:**
- One-time events
- Privacy-conscious users
- Complex calculations
- Quick settlements

## Comparison Matrix

| Feature | Traditional | Spreadsheets | Bill Splitting Apps | Payment Apps | Web Calculators |
|---------|-------------|---------------|-------------------|--------------|-----------------|
| **Cost** | Free | Free | Freemium | Free | Free |
| **Learning Curve** | Low | Medium | Low | Low | Very Low |
| **Tracking** | Poor | Good | Excellent | Poor | None |
| **Calculations** | Manual | Automated | Automated | Basic | Advanced |
| **Privacy** | High | Medium | Low | Medium | High |
| **Backup** | None | Cloud | Cloud | None | None |
| **Mobile Access** | Poor | Good | Excellent | Excellent | Good |
| **Payment Integration** | None | None | Excellent | Excellent | None |
| **Multi-currency** | Poor | Good | Excellent | Limited | Good |

## Choosing the Right Method

### Consider Your Group Size

**2-3 People:**
- Traditional methods work fine
- Simple apps are convenient
- No need for complex systems

**4-6 People:**
- Apps become more valuable
- Spreadsheets can work
- Consider hybrid approach

**7+ People:**
- Digital tools almost essential
- Manual calculations become impractical
- Advanced features needed

### Consider Frequency

**One-time Events:**
- Simple calculators work well
- Basic app features sufficient
- Traditional methods acceptable

**Ongoing Situations:**
- Spreadsheets or apps recommended
- Tracking becomes important
- Automation valuable

**Complex Scenarios:**
- Advanced apps necessary
- Multiple features needed
- Professional tools worth considering

### Consider Group Preferences

**Tech-Savvy Group:**
- Digital tools preferred
- Advanced features appreciated
- Mobile-first approach

**Mixed Tech Comfort:**
- Hybrid approaches work best
- Provide options
- Keep it simple

**Tech-Resistant Group:**
- Traditional methods only
- Simple systems required
- Patience needed

## Hybrid Approaches

### The "Best of Both Worlds" Method

1. **Use spreadsheets** for ongoing tracking
2. **Use apps** for complex calculations
3. **Use payment apps** for settlements
4. **Keep paper backup** for important records

### Example Workflow

1. **Capture expenses** in app or spreadsheet
2. **Calculate settlements** using advanced calculator
3. **Settle payments** via Venmo/PayPal
4. **Archive records** in spreadsheet
5. **Keep receipts** as backup

## Future Trends

### AI-Powered Splitting

- Automatic receipt scanning
- Intelligent categorization
- Predictive expense patterns
- Fairness optimization

### Blockchain Integration

- Cryptocurrency settlements
- Smart contracts for agreements
- Transparent transaction records
- Cross-border payments

### Enhanced Privacy

- Local-only calculations
- End-to-end encryption
- Data minimization
- User-controlled data

## Recommendations

### For Roommates
- **Primary:** Spreadsheets + Payment Apps
- **Backup:** Bill Splitting Apps
- **Why:** Ongoing tracking with flexible payments

### For Friend Groups
- **Primary:** Bill Splitting Apps
- **Backup:** Payment Apps
- **Why:** Social features with good tracking

### For Couples
- **Primary:** Payment Apps
- **Backup:** Simple Calculators
- **Why:** Simple needs with quick settlements

### For Large Groups
- **Primary:** Advanced Bill Splitting Apps
- **Backup:** Spreadsheets
- **Why:** Complex calculations needed

## Conclusion

There's no one-size-fits-all solution for bill splitting. The best approach depends on your specific situation, group preferences, and technical comfort level.

**Key takeaways:**
1. **Start simple** and upgrade if needed
2. **Consider your group's preferences** over features
3. **Use hybrid approaches** for best results
4. **Privacy matters**—choose accordingly
5. **The best tool is the one you'll actually use**

Remember, the goal is fair splitting and maintained relationships—not perfect technological solutions. Sometimes a simple method that everyone understands is better than a complex system that nobody uses.

Choose what works for your group, be willing to adapt, and prioritize communication over tools. The technology should support your relationships, not complicate them.
    `,
    likes: 42,
    relatedPosts: [1, 3, 5]
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  // Handle case where post doesn't exist
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // State for rating and interactions
  const [rating, setRating] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<{
    author: string;
    time: string;
    text: string;
  }[]>([
    {
      author: "John Doe",
      time: "2 days ago",
      text: "Great article! This really helped me understand how to split bills fairly with my roommates.",
    },
    {
      author: "Jane Smith",
      time: "1 week ago",
      text: "The calculator method mentioned here is exactly what I needed for our group trips!",
    },
  ]);

  const handlePostComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { author: "Current User", time: "Just now", text: comment.trim() },
      ]);
      setComment('');
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  
  // Handle share functionality
  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: post.excerpt,
          url,
        });
        setShareMessage('Article shared successfully!');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShareMessage('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
        setShareMessage('Failed to copy link');
      }
    }
    
    // Clear message after 3 seconds
    setTimeout(() => setShareMessage(''), 3000);
  };
  
  // Handle comments scroll
  const handleComments = () => {
    setShowComments(true);
    setTimeout(() => {
      const commentsSection = document.getElementById('comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{post.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? 'text-red-600 border-red-600' : ''}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  Like ({likes})
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 shadow-lg">
              <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  } else if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <strong key={index} className="font-bold text-gray-900 dark:text-white">
                        {paragraph.replace(/\*\*/g, '')}
                      </strong>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4 mb-2 list-disc">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  } else if (paragraph.includes('|')) {
                    return (
                      <div key={index} className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                          <tbody>
                            {paragraph.split('\n').slice(2, -2).map((row, rowIndex) => (
                              <tr key={rowIndex} className="border border-gray-300 dark:border-gray-600">
                                {row.split('|').slice(1, -1).map((cell, cellIndex) => (
                                  <td key={cellIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Blog Rating Section */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rate this article</h3>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 transition-colors hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                {rating > 0 ? `You rated this ${rating} star${rating !== 1 ? 's' : ''}` : 'Click to rate'}
              </span>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleComments}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comments
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
                {shareMessage && (
                  <span className="text-sm text-green-600 dark:text-green-400 animate-pulse">
                    {shareMessage}
                  </span>
                )}
              </div>
              
              <Link href="/calculator">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Calculator className="mr-2 h-4 w-4" />
                  Try Our Calculator
                </Button>
              </Link>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        {showComments && (
          <section id="comments-section" className="mt-16 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h3>
                
                {/* Comment Form */}
                <div className="mb-8">
                  <div className="space-y-4">
                    <textarea
                      placeholder="Share your thoughts..."
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handlePostComment}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Comments */}
                <div className="space-y-6">
                  {comments.map((c, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 ${
                          index === comments.length - 1 && c.author === "Current User"
                            ? 'bg-purple-100 dark:bg-purple-900/30'
                            : index % 2 === 0
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : 'bg-green-100 dark:bg-green-900/30'
                        } rounded-full flex items-center justify-center`}>
                          <User className={`w-5 h-5 ${
                            index === comments.length - 1 && c.author === "Current User"
                              ? 'text-purple-600 dark:text-purple-400'
                              : index % 2 === 0
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-green-600 dark:text-green-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{c.author}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{c.time}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {c.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Related Posts */}
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedPosts.map((relatedId) => {
              const relatedPost = Object.values(blogPosts).find(p => p.id === relatedId);
              if (!relatedPost) return null;
              
              return (
                <Card key={relatedPost.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{relatedPost.author}</p>
                      </div>
                      
                      <Link href={`/blog/${Object.keys(blogPosts).find(key => blogPosts[key as keyof typeof blogPosts].id === relatedPost.id)}`}>
                        <Button variant="outline" size="sm">
                          Read
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Enjoyed This Article?
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get more tips, guides, and insights about bill splitting delivered to your inbox weekly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    Subscribe
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back to Top */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
