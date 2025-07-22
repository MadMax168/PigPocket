export function ProgressBar({
        wallet
    }: {
        wallet: {
            goal: number;
            current: number;
        } | null;
    }) {
    if (!wallet) return null;

    const percentage = Math.min((wallet.current / wallet.goal) * 100, 100);

    return (
        <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
        />
        </div>
    );
}
