interface Props {
  prefix?: string;
  number: number;
}

const PrefixedNumber = ({ prefix = '#', number }: Props) => {
  return (
    <span className="prefixed-number">
      {prefix}
      {number}
    </span>
  );
};

export default PrefixedNumber;
