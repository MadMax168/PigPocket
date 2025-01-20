import { SignInTab, SignUpTab } from '@/components/register/register-forms';
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"

export function RegisterSwitch() {
    return (
        <div className="w-full h-full flex p-2 justify-between gap-2 border rounded-xl shadow-md">
            <Tabs defaultValue="signIn" className="w-3/5 h-full flex flex-col">
                <TabsList className="grid w-full h-[50px] grid-cols-2">
                    <TabsTrigger value="signIn" className="h-full">SIGN-IN</TabsTrigger>
                    <TabsTrigger value="signUp" className="h-full">SIGN-UP</TabsTrigger>
                </TabsList>
                <TabsContent value="signIn" className="h-full">
                    <SignInTab />
                </TabsContent>
                <TabsContent value="signUp" className="h-full">
                    <SignUpTab />
                </TabsContent>
            </Tabs>
            <div className="w-2/5 border rounded-xl shadow-md">

            </div>
        </div>
    )
}