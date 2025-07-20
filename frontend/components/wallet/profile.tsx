export function Profile(
    {
        wallet,
    } : {
        wallet : {
            name: string,
            target: string,
            goal: string,
        }
    }) {
    return (
        <div className="border p-5">
            <div>
                {/* Wallet Name */}
            </div>
            <div>
                {/* Progressing Bar */}
            </div>
        </div>
    )
}