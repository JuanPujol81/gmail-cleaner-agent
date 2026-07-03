
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ProcessedEmail
 * 
 */
export type ProcessedEmail = $Result.DefaultSelection<Prisma.$ProcessedEmailPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ProcessedEmails
 * const processedEmails = await prisma.processedEmail.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ProcessedEmails
   * const processedEmails = await prisma.processedEmail.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.processedEmail`: Exposes CRUD operations for the **ProcessedEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedEmails
    * const processedEmails = await prisma.processedEmail.findMany()
    * ```
    */
  get processedEmail(): Prisma.ProcessedEmailDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ProcessedEmail: 'ProcessedEmail'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "processedEmail"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProcessedEmail: {
        payload: Prisma.$ProcessedEmailPayload<ExtArgs>
        fields: Prisma.ProcessedEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          findFirst: {
            args: Prisma.ProcessedEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          findMany: {
            args: Prisma.ProcessedEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          create: {
            args: Prisma.ProcessedEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          createMany: {
            args: Prisma.ProcessedEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedEmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          delete: {
            args: Prisma.ProcessedEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          update: {
            args: Prisma.ProcessedEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedEmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          aggregate: {
            args: Prisma.ProcessedEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedEmail>
          }
          groupBy: {
            args: Prisma.ProcessedEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedEmailCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEmailCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    processedEmail?: ProcessedEmailOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ProcessedEmail
   */

  export type AggregateProcessedEmail = {
    _count: ProcessedEmailCountAggregateOutputType | null
    _avg: ProcessedEmailAvgAggregateOutputType | null
    _sum: ProcessedEmailSumAggregateOutputType | null
    _min: ProcessedEmailMinAggregateOutputType | null
    _max: ProcessedEmailMaxAggregateOutputType | null
  }

  export type ProcessedEmailAvgAggregateOutputType = {
    id: number | null
    aiConfidence: number | null
  }

  export type ProcessedEmailSumAggregateOutputType = {
    id: number | null
    aiConfidence: number | null
  }

  export type ProcessedEmailMinAggregateOutputType = {
    id: number | null
    gmailMessageId: string | null
    threadId: string | null
    sender: string | null
    subject: string | null
    snippet: string | null
    category: string | null
    importance: string | null
    recommendedAction: string | null
    classificationReason: string | null
    aiCategory: string | null
    aiConfidence: number | null
    aiReason: string | null
    labelApplied: boolean | null
    processedAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessedEmailMaxAggregateOutputType = {
    id: number | null
    gmailMessageId: string | null
    threadId: string | null
    sender: string | null
    subject: string | null
    snippet: string | null
    category: string | null
    importance: string | null
    recommendedAction: string | null
    classificationReason: string | null
    aiCategory: string | null
    aiConfidence: number | null
    aiReason: string | null
    labelApplied: boolean | null
    processedAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessedEmailCountAggregateOutputType = {
    id: number
    gmailMessageId: number
    threadId: number
    sender: number
    subject: number
    snippet: number
    category: number
    importance: number
    recommendedAction: number
    classificationReason: number
    aiCategory: number
    aiConfidence: number
    aiReason: number
    labelApplied: number
    processedAt: number
    updatedAt: number
    _all: number
  }


  export type ProcessedEmailAvgAggregateInputType = {
    id?: true
    aiConfidence?: true
  }

  export type ProcessedEmailSumAggregateInputType = {
    id?: true
    aiConfidence?: true
  }

  export type ProcessedEmailMinAggregateInputType = {
    id?: true
    gmailMessageId?: true
    threadId?: true
    sender?: true
    subject?: true
    snippet?: true
    category?: true
    importance?: true
    recommendedAction?: true
    classificationReason?: true
    aiCategory?: true
    aiConfidence?: true
    aiReason?: true
    labelApplied?: true
    processedAt?: true
    updatedAt?: true
  }

  export type ProcessedEmailMaxAggregateInputType = {
    id?: true
    gmailMessageId?: true
    threadId?: true
    sender?: true
    subject?: true
    snippet?: true
    category?: true
    importance?: true
    recommendedAction?: true
    classificationReason?: true
    aiCategory?: true
    aiConfidence?: true
    aiReason?: true
    labelApplied?: true
    processedAt?: true
    updatedAt?: true
  }

  export type ProcessedEmailCountAggregateInputType = {
    id?: true
    gmailMessageId?: true
    threadId?: true
    sender?: true
    subject?: true
    snippet?: true
    category?: true
    importance?: true
    recommendedAction?: true
    classificationReason?: true
    aiCategory?: true
    aiConfidence?: true
    aiReason?: true
    labelApplied?: true
    processedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProcessedEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEmail to aggregate.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedEmails
    **/
    _count?: true | ProcessedEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessedEmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessedEmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedEmailMaxAggregateInputType
  }

  export type GetProcessedEmailAggregateType<T extends ProcessedEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedEmail[P]>
      : GetScalarType<T[P], AggregateProcessedEmail[P]>
  }




  export type ProcessedEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEmailWhereInput
    orderBy?: ProcessedEmailOrderByWithAggregationInput | ProcessedEmailOrderByWithAggregationInput[]
    by: ProcessedEmailScalarFieldEnum[] | ProcessedEmailScalarFieldEnum
    having?: ProcessedEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedEmailCountAggregateInputType | true
    _avg?: ProcessedEmailAvgAggregateInputType
    _sum?: ProcessedEmailSumAggregateInputType
    _min?: ProcessedEmailMinAggregateInputType
    _max?: ProcessedEmailMaxAggregateInputType
  }

  export type ProcessedEmailGroupByOutputType = {
    id: number
    gmailMessageId: string
    threadId: string | null
    sender: string
    subject: string
    snippet: string | null
    category: string
    importance: string
    recommendedAction: string
    classificationReason: string | null
    aiCategory: string | null
    aiConfidence: number | null
    aiReason: string | null
    labelApplied: boolean
    processedAt: Date
    updatedAt: Date
    _count: ProcessedEmailCountAggregateOutputType | null
    _avg: ProcessedEmailAvgAggregateOutputType | null
    _sum: ProcessedEmailSumAggregateOutputType | null
    _min: ProcessedEmailMinAggregateOutputType | null
    _max: ProcessedEmailMaxAggregateOutputType | null
  }

  type GetProcessedEmailGroupByPayload<T extends ProcessedEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedEmailGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedEmailGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gmailMessageId?: boolean
    threadId?: boolean
    sender?: boolean
    subject?: boolean
    snippet?: boolean
    category?: boolean
    importance?: boolean
    recommendedAction?: boolean
    classificationReason?: boolean
    aiCategory?: boolean
    aiConfidence?: boolean
    aiReason?: boolean
    labelApplied?: boolean
    processedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gmailMessageId?: boolean
    threadId?: boolean
    sender?: boolean
    subject?: boolean
    snippet?: boolean
    category?: boolean
    importance?: boolean
    recommendedAction?: boolean
    classificationReason?: boolean
    aiCategory?: boolean
    aiConfidence?: boolean
    aiReason?: boolean
    labelApplied?: boolean
    processedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gmailMessageId?: boolean
    threadId?: boolean
    sender?: boolean
    subject?: boolean
    snippet?: boolean
    category?: boolean
    importance?: boolean
    recommendedAction?: boolean
    classificationReason?: boolean
    aiCategory?: boolean
    aiConfidence?: boolean
    aiReason?: boolean
    labelApplied?: boolean
    processedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectScalar = {
    id?: boolean
    gmailMessageId?: boolean
    threadId?: boolean
    sender?: boolean
    subject?: boolean
    snippet?: boolean
    category?: boolean
    importance?: boolean
    recommendedAction?: boolean
    classificationReason?: boolean
    aiCategory?: boolean
    aiConfidence?: boolean
    aiReason?: boolean
    labelApplied?: boolean
    processedAt?: boolean
    updatedAt?: boolean
  }

  export type ProcessedEmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gmailMessageId" | "threadId" | "sender" | "subject" | "snippet" | "category" | "importance" | "recommendedAction" | "classificationReason" | "aiCategory" | "aiConfidence" | "aiReason" | "labelApplied" | "processedAt" | "updatedAt", ExtArgs["result"]["processedEmail"]>

  export type $ProcessedEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedEmail"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gmailMessageId: string
      threadId: string | null
      sender: string
      subject: string
      snippet: string | null
      category: string
      importance: string
      recommendedAction: string
      classificationReason: string | null
      aiCategory: string | null
      aiConfidence: number | null
      aiReason: string | null
      labelApplied: boolean
      processedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["processedEmail"]>
    composites: {}
  }

  type ProcessedEmailGetPayload<S extends boolean | null | undefined | ProcessedEmailDefaultArgs> = $Result.GetResult<Prisma.$ProcessedEmailPayload, S>

  type ProcessedEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedEmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedEmailCountAggregateInputType | true
    }

  export interface ProcessedEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedEmail'], meta: { name: 'ProcessedEmail' } }
    /**
     * Find zero or one ProcessedEmail that matches the filter.
     * @param {ProcessedEmailFindUniqueArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedEmailFindUniqueArgs>(args: SelectSubset<T, ProcessedEmailFindUniqueArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedEmail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedEmailFindUniqueOrThrowArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindFirstArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedEmailFindFirstArgs>(args?: SelectSubset<T, ProcessedEmailFindFirstArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindFirstOrThrowArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedEmails
     * const processedEmails = await prisma.processedEmail.findMany()
     * 
     * // Get first 10 ProcessedEmails
     * const processedEmails = await prisma.processedEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedEmailFindManyArgs>(args?: SelectSubset<T, ProcessedEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedEmail.
     * @param {ProcessedEmailCreateArgs} args - Arguments to create a ProcessedEmail.
     * @example
     * // Create one ProcessedEmail
     * const ProcessedEmail = await prisma.processedEmail.create({
     *   data: {
     *     // ... data to create a ProcessedEmail
     *   }
     * })
     * 
     */
    create<T extends ProcessedEmailCreateArgs>(args: SelectSubset<T, ProcessedEmailCreateArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedEmails.
     * @param {ProcessedEmailCreateManyArgs} args - Arguments to create many ProcessedEmails.
     * @example
     * // Create many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedEmailCreateManyArgs>(args?: SelectSubset<T, ProcessedEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedEmails and returns the data saved in the database.
     * @param {ProcessedEmailCreateManyAndReturnArgs} args - Arguments to create many ProcessedEmails.
     * @example
     * // Create many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedEmails and only return the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedEmailCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedEmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedEmail.
     * @param {ProcessedEmailDeleteArgs} args - Arguments to delete one ProcessedEmail.
     * @example
     * // Delete one ProcessedEmail
     * const ProcessedEmail = await prisma.processedEmail.delete({
     *   where: {
     *     // ... filter to delete one ProcessedEmail
     *   }
     * })
     * 
     */
    delete<T extends ProcessedEmailDeleteArgs>(args: SelectSubset<T, ProcessedEmailDeleteArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedEmail.
     * @param {ProcessedEmailUpdateArgs} args - Arguments to update one ProcessedEmail.
     * @example
     * // Update one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedEmailUpdateArgs>(args: SelectSubset<T, ProcessedEmailUpdateArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedEmails.
     * @param {ProcessedEmailDeleteManyArgs} args - Arguments to filter ProcessedEmails to delete.
     * @example
     * // Delete a few ProcessedEmails
     * const { count } = await prisma.processedEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedEmailDeleteManyArgs>(args?: SelectSubset<T, ProcessedEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedEmailUpdateManyArgs>(args: SelectSubset<T, ProcessedEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEmails and returns the data updated in the database.
     * @param {ProcessedEmailUpdateManyAndReturnArgs} args - Arguments to update many ProcessedEmails.
     * @example
     * // Update many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedEmails and only return the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedEmailUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedEmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedEmail.
     * @param {ProcessedEmailUpsertArgs} args - Arguments to update or create a ProcessedEmail.
     * @example
     * // Update or create a ProcessedEmail
     * const processedEmail = await prisma.processedEmail.upsert({
     *   create: {
     *     // ... data to create a ProcessedEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedEmail we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedEmailUpsertArgs>(args: SelectSubset<T, ProcessedEmailUpsertArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailCountArgs} args - Arguments to filter ProcessedEmails to count.
     * @example
     * // Count the number of ProcessedEmails
     * const count = await prisma.processedEmail.count({
     *   where: {
     *     // ... the filter for the ProcessedEmails we want to count
     *   }
     * })
    **/
    count<T extends ProcessedEmailCountArgs>(
      args?: Subset<T, ProcessedEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedEmailAggregateArgs>(args: Subset<T, ProcessedEmailAggregateArgs>): Prisma.PrismaPromise<GetProcessedEmailAggregateType<T>>

    /**
     * Group by ProcessedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedEmailGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedEmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedEmail model
   */
  readonly fields: ProcessedEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedEmail model
   */
  interface ProcessedEmailFieldRefs {
    readonly id: FieldRef<"ProcessedEmail", 'Int'>
    readonly gmailMessageId: FieldRef<"ProcessedEmail", 'String'>
    readonly threadId: FieldRef<"ProcessedEmail", 'String'>
    readonly sender: FieldRef<"ProcessedEmail", 'String'>
    readonly subject: FieldRef<"ProcessedEmail", 'String'>
    readonly snippet: FieldRef<"ProcessedEmail", 'String'>
    readonly category: FieldRef<"ProcessedEmail", 'String'>
    readonly importance: FieldRef<"ProcessedEmail", 'String'>
    readonly recommendedAction: FieldRef<"ProcessedEmail", 'String'>
    readonly classificationReason: FieldRef<"ProcessedEmail", 'String'>
    readonly aiCategory: FieldRef<"ProcessedEmail", 'String'>
    readonly aiConfidence: FieldRef<"ProcessedEmail", 'Float'>
    readonly aiReason: FieldRef<"ProcessedEmail", 'String'>
    readonly labelApplied: FieldRef<"ProcessedEmail", 'Boolean'>
    readonly processedAt: FieldRef<"ProcessedEmail", 'DateTime'>
    readonly updatedAt: FieldRef<"ProcessedEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedEmail findUnique
   */
  export type ProcessedEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail findUniqueOrThrow
   */
  export type ProcessedEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail findFirst
   */
  export type ProcessedEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEmails.
     */
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail findFirstOrThrow
   */
  export type ProcessedEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEmails.
     */
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail findMany
   */
  export type ProcessedEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEmails to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEmails.
     */
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail create
   */
  export type ProcessedEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data needed to create a ProcessedEmail.
     */
    data: XOR<ProcessedEmailCreateInput, ProcessedEmailUncheckedCreateInput>
  }

  /**
   * ProcessedEmail createMany
   */
  export type ProcessedEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedEmails.
     */
    data: ProcessedEmailCreateManyInput | ProcessedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEmail createManyAndReturn
   */
  export type ProcessedEmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedEmails.
     */
    data: ProcessedEmailCreateManyInput | ProcessedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEmail update
   */
  export type ProcessedEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data needed to update a ProcessedEmail.
     */
    data: XOR<ProcessedEmailUpdateInput, ProcessedEmailUncheckedUpdateInput>
    /**
     * Choose, which ProcessedEmail to update.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail updateMany
   */
  export type ProcessedEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedEmails.
     */
    data: XOR<ProcessedEmailUpdateManyMutationInput, ProcessedEmailUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEmails to update
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to update.
     */
    limit?: number
  }

  /**
   * ProcessedEmail updateManyAndReturn
   */
  export type ProcessedEmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedEmails.
     */
    data: XOR<ProcessedEmailUpdateManyMutationInput, ProcessedEmailUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEmails to update
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to update.
     */
    limit?: number
  }

  /**
   * ProcessedEmail upsert
   */
  export type ProcessedEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The filter to search for the ProcessedEmail to update in case it exists.
     */
    where: ProcessedEmailWhereUniqueInput
    /**
     * In case the ProcessedEmail found by the `where` argument doesn't exist, create a new ProcessedEmail with this data.
     */
    create: XOR<ProcessedEmailCreateInput, ProcessedEmailUncheckedCreateInput>
    /**
     * In case the ProcessedEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedEmailUpdateInput, ProcessedEmailUncheckedUpdateInput>
  }

  /**
   * ProcessedEmail delete
   */
  export type ProcessedEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Filter which ProcessedEmail to delete.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail deleteMany
   */
  export type ProcessedEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEmails to delete
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to delete.
     */
    limit?: number
  }

  /**
   * ProcessedEmail without action
   */
  export type ProcessedEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProcessedEmailScalarFieldEnum: {
    id: 'id',
    gmailMessageId: 'gmailMessageId',
    threadId: 'threadId',
    sender: 'sender',
    subject: 'subject',
    snippet: 'snippet',
    category: 'category',
    importance: 'importance',
    recommendedAction: 'recommendedAction',
    classificationReason: 'classificationReason',
    aiCategory: 'aiCategory',
    aiConfidence: 'aiConfidence',
    aiReason: 'aiReason',
    labelApplied: 'labelApplied',
    processedAt: 'processedAt',
    updatedAt: 'updatedAt'
  };

  export type ProcessedEmailScalarFieldEnum = (typeof ProcessedEmailScalarFieldEnum)[keyof typeof ProcessedEmailScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type ProcessedEmailWhereInput = {
    AND?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    OR?: ProcessedEmailWhereInput[]
    NOT?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    id?: IntFilter<"ProcessedEmail"> | number
    gmailMessageId?: StringFilter<"ProcessedEmail"> | string
    threadId?: StringNullableFilter<"ProcessedEmail"> | string | null
    sender?: StringFilter<"ProcessedEmail"> | string
    subject?: StringFilter<"ProcessedEmail"> | string
    snippet?: StringNullableFilter<"ProcessedEmail"> | string | null
    category?: StringFilter<"ProcessedEmail"> | string
    importance?: StringFilter<"ProcessedEmail"> | string
    recommendedAction?: StringFilter<"ProcessedEmail"> | string
    classificationReason?: StringNullableFilter<"ProcessedEmail"> | string | null
    aiCategory?: StringNullableFilter<"ProcessedEmail"> | string | null
    aiConfidence?: FloatNullableFilter<"ProcessedEmail"> | number | null
    aiReason?: StringNullableFilter<"ProcessedEmail"> | string | null
    labelApplied?: BoolFilter<"ProcessedEmail"> | boolean
    processedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
  }

  export type ProcessedEmailOrderByWithRelationInput = {
    id?: SortOrder
    gmailMessageId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    sender?: SortOrder
    subject?: SortOrder
    snippet?: SortOrderInput | SortOrder
    category?: SortOrder
    importance?: SortOrder
    recommendedAction?: SortOrder
    classificationReason?: SortOrderInput | SortOrder
    aiCategory?: SortOrderInput | SortOrder
    aiConfidence?: SortOrderInput | SortOrder
    aiReason?: SortOrderInput | SortOrder
    labelApplied?: SortOrder
    processedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gmailMessageId?: string
    AND?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    OR?: ProcessedEmailWhereInput[]
    NOT?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    threadId?: StringNullableFilter<"ProcessedEmail"> | string | null
    sender?: StringFilter<"ProcessedEmail"> | string
    subject?: StringFilter<"ProcessedEmail"> | string
    snippet?: StringNullableFilter<"ProcessedEmail"> | string | null
    category?: StringFilter<"ProcessedEmail"> | string
    importance?: StringFilter<"ProcessedEmail"> | string
    recommendedAction?: StringFilter<"ProcessedEmail"> | string
    classificationReason?: StringNullableFilter<"ProcessedEmail"> | string | null
    aiCategory?: StringNullableFilter<"ProcessedEmail"> | string | null
    aiConfidence?: FloatNullableFilter<"ProcessedEmail"> | number | null
    aiReason?: StringNullableFilter<"ProcessedEmail"> | string | null
    labelApplied?: BoolFilter<"ProcessedEmail"> | boolean
    processedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
  }, "id" | "gmailMessageId">

  export type ProcessedEmailOrderByWithAggregationInput = {
    id?: SortOrder
    gmailMessageId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    sender?: SortOrder
    subject?: SortOrder
    snippet?: SortOrderInput | SortOrder
    category?: SortOrder
    importance?: SortOrder
    recommendedAction?: SortOrder
    classificationReason?: SortOrderInput | SortOrder
    aiCategory?: SortOrderInput | SortOrder
    aiConfidence?: SortOrderInput | SortOrder
    aiReason?: SortOrderInput | SortOrder
    labelApplied?: SortOrder
    processedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProcessedEmailCountOrderByAggregateInput
    _avg?: ProcessedEmailAvgOrderByAggregateInput
    _max?: ProcessedEmailMaxOrderByAggregateInput
    _min?: ProcessedEmailMinOrderByAggregateInput
    _sum?: ProcessedEmailSumOrderByAggregateInput
  }

  export type ProcessedEmailScalarWhereWithAggregatesInput = {
    AND?: ProcessedEmailScalarWhereWithAggregatesInput | ProcessedEmailScalarWhereWithAggregatesInput[]
    OR?: ProcessedEmailScalarWhereWithAggregatesInput[]
    NOT?: ProcessedEmailScalarWhereWithAggregatesInput | ProcessedEmailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProcessedEmail"> | number
    gmailMessageId?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    threadId?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    sender?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    subject?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    snippet?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    category?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    importance?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    recommendedAction?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    classificationReason?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    aiCategory?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    aiConfidence?: FloatNullableWithAggregatesFilter<"ProcessedEmail"> | number | null
    aiReason?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    labelApplied?: BoolWithAggregatesFilter<"ProcessedEmail"> | boolean
    processedAt?: DateTimeWithAggregatesFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProcessedEmail"> | Date | string
  }

  export type ProcessedEmailCreateInput = {
    gmailMessageId: string
    threadId?: string | null
    sender: string
    subject: string
    snippet?: string | null
    category: string
    importance: string
    recommendedAction: string
    classificationReason?: string | null
    aiCategory?: string | null
    aiConfidence?: number | null
    aiReason?: string | null
    labelApplied?: boolean
    processedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUncheckedCreateInput = {
    id?: number
    gmailMessageId: string
    threadId?: string | null
    sender: string
    subject: string
    snippet?: string | null
    category: string
    importance: string
    recommendedAction: string
    classificationReason?: string | null
    aiCategory?: string | null
    aiConfidence?: number | null
    aiReason?: string | null
    labelApplied?: boolean
    processedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUpdateInput = {
    gmailMessageId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    recommendedAction?: StringFieldUpdateOperationsInput | string
    classificationReason?: NullableStringFieldUpdateOperationsInput | string | null
    aiCategory?: NullableStringFieldUpdateOperationsInput | string | null
    aiConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    aiReason?: NullableStringFieldUpdateOperationsInput | string | null
    labelApplied?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gmailMessageId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    recommendedAction?: StringFieldUpdateOperationsInput | string
    classificationReason?: NullableStringFieldUpdateOperationsInput | string | null
    aiCategory?: NullableStringFieldUpdateOperationsInput | string | null
    aiConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    aiReason?: NullableStringFieldUpdateOperationsInput | string | null
    labelApplied?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailCreateManyInput = {
    id?: number
    gmailMessageId: string
    threadId?: string | null
    sender: string
    subject: string
    snippet?: string | null
    category: string
    importance: string
    recommendedAction: string
    classificationReason?: string | null
    aiCategory?: string | null
    aiConfidence?: number | null
    aiReason?: string | null
    labelApplied?: boolean
    processedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUpdateManyMutationInput = {
    gmailMessageId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    recommendedAction?: StringFieldUpdateOperationsInput | string
    classificationReason?: NullableStringFieldUpdateOperationsInput | string | null
    aiCategory?: NullableStringFieldUpdateOperationsInput | string | null
    aiConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    aiReason?: NullableStringFieldUpdateOperationsInput | string | null
    labelApplied?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gmailMessageId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    recommendedAction?: StringFieldUpdateOperationsInput | string
    classificationReason?: NullableStringFieldUpdateOperationsInput | string | null
    aiCategory?: NullableStringFieldUpdateOperationsInput | string | null
    aiConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    aiReason?: NullableStringFieldUpdateOperationsInput | string | null
    labelApplied?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProcessedEmailCountOrderByAggregateInput = {
    id?: SortOrder
    gmailMessageId?: SortOrder
    threadId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    category?: SortOrder
    importance?: SortOrder
    recommendedAction?: SortOrder
    classificationReason?: SortOrder
    aiCategory?: SortOrder
    aiConfidence?: SortOrder
    aiReason?: SortOrder
    labelApplied?: SortOrder
    processedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailAvgOrderByAggregateInput = {
    id?: SortOrder
    aiConfidence?: SortOrder
  }

  export type ProcessedEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    gmailMessageId?: SortOrder
    threadId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    category?: SortOrder
    importance?: SortOrder
    recommendedAction?: SortOrder
    classificationReason?: SortOrder
    aiCategory?: SortOrder
    aiConfidence?: SortOrder
    aiReason?: SortOrder
    labelApplied?: SortOrder
    processedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailMinOrderByAggregateInput = {
    id?: SortOrder
    gmailMessageId?: SortOrder
    threadId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    snippet?: SortOrder
    category?: SortOrder
    importance?: SortOrder
    recommendedAction?: SortOrder
    classificationReason?: SortOrder
    aiCategory?: SortOrder
    aiConfidence?: SortOrder
    aiReason?: SortOrder
    labelApplied?: SortOrder
    processedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailSumOrderByAggregateInput = {
    id?: SortOrder
    aiConfidence?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}