import * as bcrypt from "bcrypt"

export const hash = (password: string): string => bcrypt.hashSync(password, 10)
export const isMatch = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash)