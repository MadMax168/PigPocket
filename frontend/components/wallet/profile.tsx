import { ProgressBar } from "./progress-bar"
import { AddProf } from "./addProfile";

const wallets = [
  { id: 1, name: "POCKET-1", goal: 90, current: 15 },
  { id: 2, name: "POCKET-2", goal: 80, current: 55 },
  { id: 3, name: "POCKET-3", goal: 80, current: 35 },
];

export function Profile() {

    return (
        <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
            {wallets.map((wallet) => (
            <a
                key={wallet.id}
                href={`/${wallet.name}`}
                className="min-w-[180px] h-[180px] rounded-md border p-4 flex flex-col justify-between"
            >
                <div className="font-bold text-lg">{wallet.name}</div>
                <ProgressBar wallet={wallet} />
            </a>
            ))}
            {/* ปุ่ม + เพิ่ม */}
            <AddProf />
        </div>
    )
}