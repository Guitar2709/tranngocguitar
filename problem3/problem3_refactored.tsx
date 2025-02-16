interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Thêm blockchain
  }

  // Xóa FormattedWalletBalance
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { ...rest } = props; // Xóa prop children
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const blockchainPriorityMap = new Map<string, number>([
      ["Osmosis", 100],
      ["Ethereum", 50],
      ["Arbitrum", 30],
      ["Zilliqa", 20],
      ["Neo", 20]
    ]);
  
    const getPriority = (blockchain: string): number => { // Dùng map thay cho switch case
      return blockchainPriorityMap.get(blockchain) ?? -99;
    };
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances, prices]); // Thu gọn logic
  
    const rows = sortedBalances.map((balance: WalletBalance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount; // Kiểm tra prices[balance.currency]
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()} // Dùng thẳng balance.amount.toFixed()
        />
      );
    });
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  };
  