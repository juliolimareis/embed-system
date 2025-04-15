import { Timestamp } from "firebase/firestore";

type MenuItemProps = {
  id: string;
  name?: string;
  href?: string;
  icon?: string;

  deployedAt?: Date | Timestamp;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
}

export default class MenuItem {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly icon: string;

  readonly deployedAt: Date | null;
  // updatedAt: Date;
  // createdAt: Date;
  
  constructor(props: MenuItemProps){
    this.id = props.id ?? "";
    this.name = props.name ?? "";
    this.href = props.href ?? "";
    this.icon = props.icon ?? "";

    if((props?.deployedAt as Timestamp)?.toDate()){
      this.deployedAt = (props?.deployedAt as Timestamp)?.toDate()
    }else{
      this.deployedAt = props?.deployedAt as Date ?? null
    }
  }

  static create(props: MenuItemProps){
    return new MenuItem(props)
  }
}