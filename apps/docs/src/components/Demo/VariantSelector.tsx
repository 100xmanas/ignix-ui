import React from 'react';
import { Dropdown, DropdownItem } from '@site/src/components/UI/dropdown';
import { Button } from '@site/src/components/UI/button';

interface VariantSelectorProps {
  variants: string[];
  selectedVariant: string;
  onSelectVariant: (variant: string) => void;
  type?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
  type = 'Variant',
}) => {
  return (
    <div className="flex sm:justify-end justify-start mb-4 ">
      <Dropdown animation='default' className='max-h-[500px] overflow-y-scroll' trigger={<Button variant="outline" className='text-black'>Select {type}: {selectedVariant}</Button>}>
        {variants.map((v) => (
          <DropdownItem key={v} onClick={() => onSelectVariant(v)}>
            {v}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default VariantSelector;
