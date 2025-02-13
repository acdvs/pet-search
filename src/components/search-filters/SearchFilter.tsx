import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function SearchFilter({
  label,
  selectionText,
  children,
  onSubmit,
  onOpenChange,
}: {
  label: string;
  selectionText?: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onOpenChange: () => void;
}) {
  const a11yLabel = label.toLowerCase().replaceAll(' ', '-');
  const labelId = `filter-${a11yLabel}-label`;
  const currentId = `filter-${a11yLabel}-current`;

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          aria-labelledby={`${labelId} ${currentId}`}
          className="h-[unset] py-1 px-4 gap-1 rounded-full"
        >
          <span id={labelId} aria-label={`${label} filter`}>
            {label}
          </span>
          {!!selectionText && (
            <span id={currentId} aria-label={`(currently ${selectionText})`}>
              ({selectionText})
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        {children}
        <Button type="submit" className="w-full h-7 mt-8" onClick={onSubmit}>
          Update filter
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function FilteredItem({
  value,
  remove,
}: {
  value: string;
  remove: (x: string) => void;
}) {
  return (
    <div className="flex items-center pl-3 pr-2 text-sm bg-foreground text-background rounded-full cursor-default group">
      <span>{value}</span>
      <X
        className="delete h-3 stroke-2 pl-1 cursor-pointer group-hover:stroke-3 group-hover:stroke-red-500 "
        onClick={() => remove(value)}
      >
        x
      </X>
    </div>
  );
}

export { SearchFilter, FilteredItem };
