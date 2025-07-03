export type RejectValue = string;

export type ThunkConfig<State, RejectValue = unknown> = {
	state: State;
	rejectValue: RejectValue;
};

export type ThunkCondition<Args, State> = (
	args: Args,
	context: {
		getState: () => State;
	},
) => boolean;
