interface WalletBalance {// Thiếu blockchain: string;
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {// FormattedWalletBalance không cần thiết
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props; // prop children không sử dụng
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: any): number => {// chuyển sang dùng map để tối ưu hơn cho tra dữ liệu
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);// balancePriority không sử dụng
            if (lhsPriority > -99) {// lhsPriority chưa khởi tạo, biến đúng là balancePriority
                if (balance.amount <= 0) {// Sai điều kiện điều kiện đúng là balance.amount > 0
                    return true;
                }
            }
            return false // Nên gộp điều kiện filter lại để dễ đọc
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);// blockchain chưa được khai báo trong WalletBalance
            const rightPriority = getPriority(rhs.blockchain);// blockchain chưa được khai báo trong WalletBalance
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
            // nên gộp điều kiện sort lại để đễ đọc
        });
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {// formattedBalances chưa được sử dụng và cũng không cần thiết
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {// có thể dùng WalletBalance
        const usdValue = prices[balance.currency] * balance.amount;// nên kiểm tra prices[balance.currency] với ?. hay ??
        return (
            <WalletRow
                className={classes.row}// Chưa định nghĩa classes hoặc nằm ở file css nào đó chưa import
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}// có thể dùng balance.amount.toFixed() với balance là WalletBalance
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}