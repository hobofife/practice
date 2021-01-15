I'm learning to use [Ledger](https://www.ledger-cli.org/). I've taken
some time of doing any accounting or budgeting since giving up on
YNAB. I guess I'd recommend YNAB to people who need to get their
spending under control, I think it's a pretty nice app, but it doesn't
feel like "real" accounting tool, I fought to try to get it to
accurately describe my finances. YNAB is an app envelope-budgeting,
and I figured out after a few months that I really don't want or need
that kind of budgeting system to reach my financial goals. But maybe I
do need some understanding of bookkeeping and accounting?

Ledger is cool because I'm not fighting with any software to
understand what is going on, I'm just looking at journal entries, more
or less how I'd write down entries by hand.

I use my personal checking account and credit cards for my very small
side-business, but I want to keep separate books for personal finance
and business.

## Expenses from shared checking account

Let's say I pay $500 to a contractor from my personal checking
account, but I want to record this as an expense for my business. I
deduct funds from my checking account in my personal book and add the
funds to a personal expense account called "capital
contribution". Then in the business book, I add funds to the checking
account, deducting the funds from an equity account called "capital
contribution".

I've added an opening balance and a personal expense to make the
example a little more realistic.

personal.txt:
```
2020-09-01 * Checking balance
    Assets:Checking                         10000.00 USD
    Equity:Opening Balances

2020-09-02 * Coffee Shop
    Expenses:Lifestyle:Restaurants             10.00 USD
    Liabilities:Credit Card:American Express

2020-09-03 * Capital Contribution - V8 Publishing
    Expenses:Capital Contribution:V8 Publishing  500.00 USD
    Assets:Checking
```

business.txt:
```
2020-09-03 * Capital Contribution - Tom
    Assets:Checking                           500.00 USD
    Equity:Capital Contributions:Tom

2020-09-03 * Nicolas L. - Software Contractor
    Expenses:Software Development             500.00 USD
    Assets:Checking
```

So the $500 used to pay the contractor remained in the same checking
account, but the capital contribution journal entries allowed me to
transfer the funds between the two books.


## Business income and balance assertions

My business has made a sale. I see the revenue in my personal
checking account transactions, but I don't record the transaction in
my personal book, it goes directly into the business book.

business.txt:
```
2020-09-04 * Amazon
    Assets:Checking                            24.00 USD
    Income:Sales:Illustrated Chess
```

Now if I use Ledger to run a balance report on my personal and
business books, they will show different values for the checking
account, each book show the portion of the checking account that
belongs to it.

```
tom@ladybird sample-ledger$ ledger -f personal.txt bal
         9500.00 USD  Assets:Checking
       -10000.00 USD  Equity:Opening Balances
          510.00 USD  Expenses
          500.00 USD    Capital Contribution:V8 Publishing
           10.00 USD    Lifestyle:Restaurants
          -10.00 USD  Liabilities:Credit Card:American Express
--------------------
                   0
```

```
tom@ladybird sample-ledger$ ledger -f business.txt bal
           24.00 USD  Assets:Checking
         -500.00 USD  Equity:Capital Contributions:Tom
          500.00 USD  Expenses:Software Development
          -24.00 USD  Income:Sales:Illustrated Chess
--------------------
                   0
```

But the real checking account balance is $9,524. I want to use balance
assertions to make sure that the balance in my books matches the
balance reported by the bank.

Because the account names are the same in both books, I can use Ledger
`include` statements to combine the books together and get my actual
checking account balance. Then I can add a balance assertion to the
combined books.

combined.txt:
```
2020-09-05 * Balance Assertion 
    Equity:Adjustments                             0 USD
    Assets:Checking       -0 USD = 9524 USD
```

And the combined balance report looks like this:
```
tom@ladybird sample-ledger$ ledger -f combined.txt bal
         9524.00 USD  Assets:Checking
       -10500.00 USD  Equity
         -500.00 USD    Capital Contributions:Tom
       -10000.00 USD    Opening Balances
         1010.00 USD  Expenses
          500.00 USD    Capital Contribution:V8 Publishing
           10.00 USD    Lifestyle:Restaurants
          500.00 USD    Software Development
          -24.00 USD  Income:Sales:Illustrated Chess
          -10.00 USD  Liabilities:Credit Card:American Express
--------------------
                   0
```

Let's say I incorrectly recorded the revenue as $25 instead of $24,
then Ledger will report an error when I try to run the balance report.

```
tom@ladybird sample-ledger$ ledger -f combined.txt bal
While parsing file "/home/tom/practice/sample-ledger/combined.txt", line 8:
While parsing posting:
  Assets:Checking       -0 USD = 9524 USD
                                 ^^^^^^^^
Error: Balance assertion off by -1.00 USD (expected to see 9525.00 USD)
```

One issue with balance assertions, which has been brought up on the
Ledger mailing list, is that assertions are "position dependent" and
not "date aware". Which means if I create a balance assertion in
`combined.txt` for September 5, 2020 and then add entries to the books
and run the balance report again, the balance assertion will
fail. Even though the new transactions happen after the date of the
assertion.

A simple solution to this would be to update the balance assertions
for the most recent date, and start a new set of files every quarter
or year. This wouldn't mean a new set of books, just the addition of
`include` statements to the new files for each year or quarter. The
old balance assertions should then work because records will be
processed in the correct order.

Another solution would be to merge and sort all of the books. This
demonstrates one reason why text-based tools are cool, a solution can
be developed in a few minutes using standard Linux tools.

## Expenses from shared credit card

There are both personal and business expenses on the credit card.

personal.txt
```

2020-09-02 * Coffee Shop
    Expenses:Lifestyle:Restaurants             10.00 USD
    Liabilities:Credit Card:American Express

2020-09-06 * Coffee Shop
    Expenses:Lifestyle:Restaurants             14.00 USD
    Liabilities:Credit Card:American Express

```

business.txt
```
2020-09-06 * Server Fees
    Expenses:Equipment:Servers                 50.00 USD
    Liabilities:Credit Card:American Express
```

Like with the checking account, I can see these credit card balances
separately, each book showing the transactions it is responsible for,
and I can see the total real balance using the combined book.

Unlike the checking account, things are not resolved with simply
recording the spending. I also need to pay off the credit card
balance. To do this, I will personally pay my share of the credit card
bill and the business will pay it's share of the credit card bill, and
I will personally make a capital contribution to the business to give
it the funds to pay it's share.

The credit card balance is $74, $24 personal and $50 business.

personal.txt
```
2020-09-10 * American Express
    Liabilities:Credit Card:American Express   24.00 USD
    Assets:Checking

2020-09-10 * Capital Contribution - Tom
    Equity:Capital Contributions:Tom           50.00 USD
    Assets:Checking                           
```

business.txt
```
2020-09-03 * Capital Contribution - Tom
    Assets:Checking                           50.00 USD
    Equity:Capital Contributions:Tom

2020-09-10 * American Express
    Liabilities:Credit Card:American Express   50.00 USD
    Assets:Checking
```

To keep things simple, I'd probably record a single capital
contribution at the beginning of each month or quarter, but I'm making
it granular here to illustrate the idea.


## Adding another business

I'm a self-employed contractor, so I actually have two businesses, the
publishing business and selling my labor as a programmer. It clouds
the picture of my household finances to include business expenses like
my office rent, so I can create a third book for my
self-employment, using the same techniques I used for the other
business.

The difference here is that I usually move money from my household
into my publishing business, but with my contracting business I need
to move money from the business into my household.

I think it should look like this:

contracting.txt
```
2020-10-01 * My Favorite Client
    Assets:Checking                         10000.00 USD
    Income:Labor:My Favorite Client

2020-10-01 * Household Income
    Expenses:Household Income                9000.00 USD
    Assets:Checking
```

personal.txt
```
2020-10-01 * Household Income - Contracting
    Assets:Checking                          9000.00 USD
    Income:Contracting
```

So even though the money actually stays in the checking account, the
same sort of transactions take place as when I transfer money into a
business.


## Doesn't capital contribution get me an asset?

I got confused while thinking about this, but capital contribution is
not the acquisition of more asset value. I could see this was the case
because the accounting doesn't work, then I understood how to think
about it.

My business is as asset and I own 100% of it. I guess I can record the
business in my personal assets if I want to. But contributing capital
to the business does not increase my ownership in the business, I am
not purchasing more shares, I am only spending money on my existing
asset, so it is an expense, not an asset.

Say I record my watch as an asset, and then I need to spend $1,000 to
have the watch serviced. I did not gain $1,000 in assets, I still own
one watch. I spent money on the asset. Maybe the watch changed in
value by having it serviced, but that is the intrinsic owner equity on
the watch's balance sheet, from the point of view of my personal
balances, it's still one watch.
