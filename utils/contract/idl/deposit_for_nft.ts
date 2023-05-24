export type DepositForNft = {
  version: "0.1.0";
  name: "deposit_for_nft";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "bankAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "pdaAuth";
          isMut: false;
          isSigner: false;
        },
        {
          name: "bankAuth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "depositForNft";
      accounts: [
        {
          name: "bankAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaAuth";
          isMut: false;
          isSigner: false;
        },
        {
          name: "solVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "withdrawForBurned";
      accounts: [
        {
          name: "bankAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pdaAuth";
          isMut: false;
          isSigner: false;
        },
        {
          name: "solVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clientAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "withdrawForExpired";
      accounts: [
        {
          name: "bankAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pdaAuth";
          isMut: false;
          isSigner: false;
        },
        {
          name: "solVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clientAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "withdrawForVerified";
      accounts: [
        {
          name: "bankAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pdaAuth";
          isMut: false;
          isSigner: false;
        },
        {
          name: "solVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bankAuth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clientAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "bankAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bankAuth";
            type: "publicKey";
          },
          {
            name: "authBump";
            type: "u8";
          },
          {
            name: "solVaultBump";
            type: {
              option: "u8";
            };
          },
          {
            name: "nftAmount";
            type: {
              defined: "NftAmount";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "NftAmount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "total";
            type: "u16";
          },
          {
            name: "remained";
            type: "u16";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InitializeError";
      msg: "Failed to initialize contract.";
    },
    {
      code: 6001;
      name: "NoNftLeftError";
      msg: "There is not NFTs left to withdraw sol";
    }
  ];
};

export const IDL: DepositForNft = {
  version: "0.1.0",
  name: "deposit_for_nft",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "bankAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pdaAuth",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bankAuth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "depositForNft",
      accounts: [
        {
          name: "bankAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaAuth",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "withdrawForBurned",
      accounts: [
        {
          name: "bankAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pdaAuth",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clientAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "withdrawForExpired",
      accounts: [
        {
          name: "bankAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pdaAuth",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clientAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "withdrawForVerified",
      accounts: [
        {
          name: "bankAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pdaAuth",
          isMut: false,
          isSigner: false,
        },
        {
          name: "solVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bankAuth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clientAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "bankAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bankAuth",
            type: "publicKey",
          },
          {
            name: "authBump",
            type: "u8",
          },
          {
            name: "solVaultBump",
            type: {
              option: "u8",
            },
          },
          {
            name: "nftAmount",
            type: {
              defined: "NftAmount",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "NftAmount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "total",
            type: "u16",
          },
          {
            name: "remained",
            type: "u16",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InitializeError",
      msg: "Failed to initialize contract.",
    },
    {
      code: 6001,
      name: "NoNftLeftError",
      msg: "There is not NFTs left to withdraw sol",
    },
  ],
};
