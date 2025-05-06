import { ModalContainer } from "../modals/ModalContainer";
import { useLists } from "@/hooks/data-base/useList";
import { ChoiceList } from "./choice-list/ChoiceList";
import { DateType } from "@/db/schema";

interface Props {
  value: number;
  onChange: (item: number) => void;
  date: DateType;
}

export function ModalListChoice({ date }: Props) {
  const { data: lists } = useLists();
  return (
    <ModalContainer variant="withPlusIcon">
      <ChoiceList
        lists={lists ?? []}
        date={date}
      />
    </ModalContainer>
  );
}
