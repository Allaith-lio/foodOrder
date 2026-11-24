import InputField from "./InputField";
import AvatarField from "./AvatarField";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Search,
  AlignLeft,
  Phone,
  MapPin,
  Home,
} from "lucide-react";

const iconMap = {
  user: UserRound,
  mail: Mail,
  lock: LockKeyhole,
  search: Search,
  alignLeft: AlignLeft,
  phone: Phone,
  mapPin: MapPin,
  home: Home,
};

export default function FormFields({
  fields,
  register,
  setValue,
  errors = {},
  trailingFor,
}) {
  return (
    <>
      {Object.keys(fields).map((name) => {
        const config = fields[name];

        if (config.type === "file") {
          return (
            <AvatarField
              key={name}
              name={name}
              label={config.label}
              error={errors[name]?.message}
              required={config.required ?? !config.optional}
              onChange={(file) => setValue?.(name, file, { shouldValidate: true })}
            />
          );
        }

        const { icon, optional, required, ...rest } = config;
        delete rest.rule;
        const Icon = iconMap[icon];
        const fieldRegistration = register(name);

        return (
          <InputField
            key={name}
            icon={Icon}
            error={errors[name]?.message}
            required={required ?? !optional}
            trailing={trailingFor ? trailingFor(name) : undefined}
            {...fieldRegistration}
            {...rest}
          />
        );
      })}
    </>
  );
}