<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@firebase/auth-types](./auth-types.md) &gt; [AuthCredential](./auth-types.authcredential.md) &gt; [fromJSON](./auth-types.authcredential.fromjson.md)

## AuthCredential.fromJSON() method

Static method to deserialize a JSON representation of an object into an [AuthCredential](./auth-types.authcredential.md)<!-- -->.

<b>Signature:</b>

```typescript
static fromJSON(json: object | string): AuthCredential | null;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  json | object \| string | Either <code>object</code> or the stringified representation of the object. When string is provided, <code>JSON.parse</code> would be called first. |

<b>Returns:</b>

[AuthCredential](./auth-types.authcredential.md) \| null

If the JSON input does not represent an [AuthCredential](./auth-types.authcredential.md)<!-- -->, null is returned.
