import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const RadioGroup = React.forwardRef<RadioGroupPrimitive.RootRef, RadioGroupPrimitive.RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root className={cn('web:grid gap-2', className)} {...props} ref={ref} />
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<RadioGroupPrimitive.ItemRef, RadioGroupPrimitive.ItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square h-10 w-10 native:h-8 native:w-8 rounded-full justify-center items-center border border-primary-foreground text-primary-foreground web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.disabled && 'web:cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <View className='aspect-square h-[10px] w-[10px] native:h-[20] native:w-[20] bg-primary-foreground rounded-full' />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
