import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    modalTitle: string;
    toggleModal: (isOpen: boolean) => void;
}

export default function Modal(props: ModalProps) {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.toggleModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.modalTitle}</DialogTitle>
                </DialogHeader>
                {props.children}
            </DialogContent>
        </Dialog>
    );
}