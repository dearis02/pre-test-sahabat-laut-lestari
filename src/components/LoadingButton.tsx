import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"


export default function LoadingButton(props: {
    className?: string;
}) {
    return (
        <Button disabled className={props.className}>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </Button>
    );
}