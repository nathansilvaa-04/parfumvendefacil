export default abstract class BaseEntity<T = number> {
  id?: T;
  createdAt?: Date;
  updatedAt?: Date;
}
